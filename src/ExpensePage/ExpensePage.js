import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function ExpensePage() {
  const navigate = useNavigate();

  function DashboardPage() {
    navigate('/dashboard');
  }

  function LogoutPage() {
    localStorage.removeItem('jwt');
    navigate('/');
  }

  const [titleArray, setTitleArray] = useState([]);
  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState('');
  const [tag, setTag] = useState('');
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Fetch titleArray on component mount
  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      axios.get('http://localhost:3001/api/getbudget', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        const fetchedTitleArray = response.data.budget;
        console.log('Budget information:', fetchedTitleArray);
        setTitleArray(fetchedTitleArray);
      })
      .catch(error => {
        console.error('Error fetching budget information:', error);
      });
    }
  }, []); // Empty dependency array to run only once on mount

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate budget field
    const isValidNumber = !isNaN(parseFloat(budget)) && isFinite(budget);
    if (!isValidNumber || budget < 0) {
      console.error('Invalid budget value');
      return;
    }

    // Round the budget to the nearest hundredth
    const roundedBudget = Math.round(budget * 100) / 100;

    // Process the form data
    console.log('Title:', title);
    console.log('Budget:', roundedBudget);
    console.log('Tag:', tag);

    // Axios POST request to the API with the JWT token
    try {
      const token = localStorage.getItem('jwt'); // Retrieve the JWT token from local storage

      if (!token) {
        console.error('JWT token not found');
        return;
      }

      const response = await axios.post(
        'http://localhost:3001/api/addexpense',
        {
          title: title,
          budget: roundedBudget,
          tag: tag
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        }
      );

      console.log('API response:', response.data);
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <div>
      ExpensePage
      <button onClick={DashboardPage}>Dashboard</button>
      <button onClick={LogoutPage}>Logout</button>

      <form onSubmit={handleSubmit}>
        {/* Title Field (Dropdown) */}
        <label htmlFor="title">Title:</label>
        <select
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        >
          <option value="" disabled>Select a Title</option>
          {titleArray.map((titleOption) => (
            <option key={titleOption} value={titleOption}>
              {titleOption}
            </option>
          ))}
        </select>

        {/* Budget Field */}
        <label htmlFor="budget">Expenses:</label>
        <input
          type="number"
          id="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />

        {/* Tag Field (Dropdown) */}
        <label htmlFor="tag">Tag:</label>
        <select
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          required
        >
          <option value="" disabled>Select a Month</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ExpensePage;
