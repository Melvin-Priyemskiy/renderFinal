import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function ExpensePage() {
  const navigate = useNavigate();

  function DashboardPage() {
    navigate('/dashboard');
  }

  function LogoutPage() {
    localStorage.removeItem('jwt');
    navigate('/');
  }

  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState('');
  const [tag, setTag] = useState('');
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Process the form data
    console.log('Title:', title);
    console.log('Budget:', budget);
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
          budget: budget,
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
        {/* Title Field */}
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Budget Field */}
        <label htmlFor="budget">Budget:</label>
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
