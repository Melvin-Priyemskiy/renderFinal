import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

function DashboardPage() {
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const [budgetInfo, setBudgetInfo] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

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
        // Divide up the response
        var budgetArray = response.data.budget;
        var catagoryArray = response.data.catagory;
        var expenses = response.data.expense;

        // Set budget info state
        setBudgetInfo(budgetArray);

        // Create or update the chart
        createChart(chartRef.current, catagoryArray, budgetArray, expenses, selectedMonth);
      })
      .catch(error => {
        console.error('Error fetching budget information:', error);
      });
    }
  }, [selectedMonth]); // Update the chart when the selected month changes

  // Function to handle month selection
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Create an array of all months
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div>
      <div>
        <button onClick={() => navigate('/')}>Logout</button>
        <button onClick={() => navigate('/budgetpage')}>Configure Budget</button>
        <button onClick={() => navigate('/expensepage')}>Add Expenses</button>
      </div>

      <div>
        <h2>Budget Information</h2>
        <ul>
          {budgetInfo.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Dropdown for month selection */}
      <label>Select Month:</label>
      <select onChange={handleMonthChange} value={selectedMonth}>
        <option value="">All Months</option>
        {months.map((month, index) => (
          <option key={index} value={month}>{month}</option>
        ))}
      </select>

      {/* Chart canvas */}
      <canvas id="budgetExpenseChart" ref={chartRef} width="800" height="400"></canvas>
    </div>
  );
}

function createChart(chartRef, categories, budget, expenses, selectedMonth) {
  if (!chartRef) return;

  const ctx = chartRef.getContext('2d');

  // Check if a chart instance already exists
  if (ctx.chart) {
    // Destroy the existing chart instance
    ctx.chart.destroy();
  }

  // Prepare data
  const budgetLabels = categories;
  const budgetData = budget;

  // Filter expenses based on the selected month or show all months if none selected
  const filteredExpenses = selectedMonth
    ? expenses.filter(expense => expense.tag === selectedMonth)
    : expenses;

  console.log('Filtered Expenses:', filteredExpenses);

  // Use accumulated expense data for the selected month(s)
  const organizedExpenseData = [];
  for (let i = 0; i < budgetLabels.length; i++) {
    const category = budgetLabels[i];
    const totalExpense = filteredExpenses
      .filter(expense => expense.title === category)
      .reduce((sum, expense) => sum + expense.budget, 0);

    organizedExpenseData.push(totalExpense);
  }

  console.log('Organized Expense Data:', organizedExpenseData);

  // Create the chart
  const newChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: budgetLabels,
      datasets: [
        {
          label: 'Budget',
          data: budgetData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Expenses',
          data: organizedExpenseData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Attach the new chart instance to the canvas element
  ctx.chart = newChart;
}



export default DashboardPage;
