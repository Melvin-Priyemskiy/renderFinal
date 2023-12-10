import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function DashboardPage() {
  const navigate = useNavigate();

  function LandingPage() {
    localStorage.removeItem('jwt');
    navigate('/');
  }

  function BudgetPage() {
    navigate('/budgetpage');
  }

  function ExpensePage() {
    navigate('/expensepage');
  }

  const [budgetInfo, setBudgetInfo] = useState([]);

  // Fetch budget information on component mount
  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      axios.get('http://localhost:3001/api/getAll', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
          console.log(response)
          //divide up the response
          
      })
      .catch(error => {
        console.error('Error fetching budget information:', error);
      });
    }
  }, []); // Empty dependency array to run only once on mount

  return (
    <div>
      DashboardPage
      <div>
        <button onClick={LandingPage}>Logout</button>
        <button onClick={BudgetPage}>Configure Budget</button>
        <button onClick={ExpensePage}>Add Expenses</button>
      </div>

      {/* Display budget information */}
      <div>
        <h2>Budget Information</h2>
        <ul>
          {budgetInfo.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashboardPage;
