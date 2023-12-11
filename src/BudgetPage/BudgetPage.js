import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BudgetPage = () => {
  const navigate = useNavigate();

  function DashboardPage() {
    navigate('/dashboard');
  }

  function LogoutPage() {
    localStorage.removeItem('jwt');
    navigate('/');
  }

  // State to store budget categories
  const [budgetCategories, setBudgetCategories] = useState([{ title: '', amount: '' }]);

  // State to store form submission result
  const [formResult, setFormResult] = useState(null);

  // Event handler for updating budget categories
  const handleCategoryChange = (index, field, value) => {
    setBudgetCategories((prevCategories) => {
      const newCategories = [...prevCategories];
      newCategories[index][field] = value;
      return newCategories;
    });
  };

  // Event handler for adding a new budget category
  const addCategory = () => {
    if (budgetCategories.length < 12) {
      setBudgetCategories((prevCategories) => [...prevCategories, { title: '', amount: '' }]);
    }
  };

  // Event handler for removing a budget category
  const removeCategory = (index) => {
    setBudgetCategories((prevCategories) => {
      const newCategories = [...prevCategories];
      newCategories.splice(index, 1);
      return newCategories;
    });
  };

  // Check for identical categories
  const hasIdenticalCategories = () => {
    const uniqueTitles = new Set(budgetCategories.map((category) => category.title.toLowerCase()));
    return uniqueTitles.size !== budgetCategories.length;
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for identical categories
    if (hasIdenticalCategories()) {
      const result = { success: false, errors: ['Identical categories are not allowed. Please make each category unique.'] };
      setFormResult(result);
      console.error('Form submission failed:', result);
      return;
    }

    // Check for errors
    const errors = validateForm();
    const hasFilledCategory = budgetCategories.some(
      (category) => category.title.trim() !== '' && category.amount.trim() !== ''
    );

    if (errors.length === 0 && hasFilledCategory) {
      // Process the form data
      const result = {
        success: true,
        data: budgetCategories.filter((category) => category.title || category.amount),
      };
      setFormResult(result);
      console.log('Form submitted successfully:', result);

      // Axios POST request to the API with the JWT token
      try {
        const token = localStorage.getItem('jwt'); // Retrieve the JWT token from local storage

        if (!token) {
          console.error('JWT token not found');
          return;
        }

        // Round the amount field to the nearest hundredth place
        const roundedCategories = result.data.map((category) => ({
          ...category,
          amount: Math.round(parseFloat(category.amount) * 100) / 100,
        }));

        const response = await axios.post(
          'https://backendapi-f7yb.onrender.com/api/makebudget',
          { formData: roundedCategories }, // Adjust the data being sent to the API as needed
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
            },
          }
        );

        console.log('API response:', response.data);
        navigate('/dashboard');

      } catch (error) {
        console.error('Error sending POST request:', error);
      }
    } else {
      const result = {
        success: false,
        errors: [...errors, hasFilledCategory ? '' : 'At least one category must be filled'],
      };
      setFormResult(result);
      console.error('Form submission failed:', result);
    }
  };

  // Validate form data
  const validateForm = () => {
    const errors = [];
    budgetCategories.forEach((category, index) => {
      if ((category.title.trim() && !category.amount.trim()) || (!category.title.trim() && category.amount.trim())) {
        errors.push(`Category ${index + 1}: Both title and budget must be filled`);
      }

      // Validate the amount field
      if (category.amount.trim()) {
        const amountValue = parseFloat(category.amount.trim());
        if (isNaN(amountValue) || amountValue < 0) {
          errors.push(`Category ${index + 1}: Amount must be a non-negative number`);
        }
      }
    });
    return errors;
  };

  return (
    <div>
      <button onClick={DashboardPage}>Dashboard</button>
      <button onClick={LogoutPage}>Logout</button>

      <form onSubmit={handleSubmit}>
        <h2>Budget Form</h2>
        {budgetCategories.map((category, index) => (
          <div key={index}>
            <label htmlFor={`title-${index}`}>Category {index + 1} Title:</label>
            <input
              type="text"
              id={`title-${index}`}
              value={category.title}
              onChange={(e) => handleCategoryChange(index, 'title', e.target.value)}
            />

            <label htmlFor={`amount-${index}`}>Category {index + 1} Amount:</label>
            <input
              type="number" // Update to number type for amount
              step="0.01" // Allow two decimal places
              id={`amount-${index}`}
              value={category.amount}
              onChange={(e) => handleCategoryChange(index, 'amount', e.target.value)}
            />

            <button type="button" onClick={() => removeCategory(index)}>
              Remove Category
            </button>
          </div>
        ))}

        {budgetCategories.length < 12 && (
          <button type="button" onClick={addCategory}>
            Add Category
          </button>
        )}

        <button type="submit">Submit</button>
      </form>

      {formResult && (
        <div>
          <h2>Form Submission Result</h2>
          {formResult.success ? (
            <p>Form submitted successfully!</p>
          ) : (
            <ul>
              {formResult.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
          {hasIdenticalCategories() && (
            <p>Identical categories are not allowed. Please make each category unique before submitting the form.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
