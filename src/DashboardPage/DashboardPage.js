import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

function DashboardPage() {
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);
  const budgetPieChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const stackedBarChartRef = useRef(null);

  const [budgetInfo, setBudgetInfo] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  const createChart = (chartRef, categories, budget, expenses, selectedMonth) => {
    if (!chartRef) return;

    const ctx = chartRef.getContext('2d');

    if (ctx.chart) {
      ctx.chart.destroy();
    }

    const budgetLabels = categories;
    const budgetData = budget;

    const filteredExpenses = selectedMonth
      ? expenses.filter(expense => expense.tag === selectedMonth)
      : expenses;

    const organizedExpenseData = [];
    for (let i = 0; i < budgetLabels.length; i++) {
      const category = budgetLabels[i];
      const totalExpense = filteredExpenses
        .filter(expense => expense.title === category)
        .reduce((sum, expense) => sum + expense.budget, 0);

      organizedExpenseData.push(totalExpense);
    }

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

    ctx.chart = newChart;
  };

  const createPieChart = (chartRef, categories, expenses, selectedMonth) => {
    if (!chartRef) return;

    const ctx = chartRef.getContext('2d');

    if (ctx.chart) {
      ctx.chart.destroy();
    }

    const filteredExpenses = selectedMonth
      ? expenses.filter(expense => expense.tag === selectedMonth)
      : expenses;

    const expenseLabels = categories;
    const expenseData = [];

    for (let i = 0; i < expenseLabels.length; i++) {
      const category = expenseLabels[i];
      const totalExpense = filteredExpenses
        .filter(expense => expense.title === category)
        .reduce((sum, expense) => sum + expense.budget, 0);

      expenseData.push(totalExpense);
    }

    const newPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: expenseLabels,
        datasets: [{
          data: expenseData,
          backgroundColor: getRandomColors(expenseLabels.length),
        }],
      },
    });

    ctx.chart = newPieChart;
  };

  const createBudgetPieChart = (chartRef, categories, budget) => {
    if (!chartRef) return;

    const ctx = chartRef.getContext('2d');

    if (ctx.chart) {
      ctx.chart.destroy();
    }

    const budgetLabels = categories;
    const budgetData = budget;

    const newPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: budgetLabels,
        datasets: [{
          data: budgetData,
          backgroundColor: getRandomColors(budgetLabels.length),
        }],
      },
    });

    ctx.chart = newPieChart;
  };

  const createDoughnutChart = (chartRef, budget, expenses, selectedMonth) => {
    if (!chartRef) return;

    const ctx = chartRef.getContext('2d');

    if (ctx.chart) {
      ctx.chart.destroy();
    }

    const budgetLabels = budget.map((item, index) => `Category ${index + 1}`);
    const budgetData = budget;

    const filteredExpenses = selectedMonth
      ? expenses.filter(expense => expense.tag === selectedMonth)
      : expenses;

    const organizedExpenseData = [];
    for (let i = 0; i < budgetLabels.length; i++) {
      const category = budgetLabels[i];
      const totalExpense = filteredExpenses
        .filter(expense => expense.title === category)
        .reduce((sum, expense) => sum + expense.budget, 0);

      organizedExpenseData.push(totalExpense);
    }

    const newDoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: budgetLabels,
        datasets: [
          {
            data: budgetData,
            backgroundColor: getRandomColors(budgetLabels.length),
          },
          {
            data: organizedExpenseData,
            backgroundColor: getRandomColors(budgetLabels.length),
          },
        ],
      },
    });

    ctx.chart = newDoughnutChart;
  };

  const createStackedBarChart = (chartRef, categories, budget, expenses, selectedMonth) => {
    if (!chartRef) return;

    const ctx = chartRef.getContext('2d');

    if (ctx.chart) {
      ctx.chart.destroy();
    }

    const budgetLabels = categories;
    const budgetData = budget;

    const filteredExpenses = selectedMonth
      ? expenses.filter(expense => expense.tag === selectedMonth)
      : expenses;

    const organizedExpenseData = [];
    for (let i = 0; i < budgetLabels.length; i++) {
      const category = budgetLabels[i];
      const totalExpense = filteredExpenses
        .filter(expense => expense.title === category)
        .reduce((sum, expense) => sum + expense.budget, 0);

      organizedExpenseData.push(totalExpense);
    }

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
          x: { stacked: true },
          y: { stacked: true },
        },
      },
    });

    ctx.chart = newChart;
  };

  const getRandomColors = (count) => {
    const colors = [];

    for (let i = 0; i < count; i++) {
      const color = `rgba(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()}, 0.8)`;
      colors.push(color);
    }

    return colors;
  };

  const getRandomValue = () => {
    return Math.floor(Math.random() * 256);
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      axios.get('http://localhost:3001/api/getAll', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        const budgetArray = response.data.budget;
        const categoryArray = response.data.catagory;
        const expenses = response.data.expense;

        setBudgetInfo(budgetArray);

        createChart(chartRef.current, categoryArray, budgetArray, expenses, selectedMonth);
        createPieChart(pieChartRef.current, categoryArray, expenses, selectedMonth);
        createBudgetPieChart(budgetPieChartRef.current, categoryArray, budgetArray);
        createDoughnutChart(doughnutChartRef.current, budgetArray, expenses, selectedMonth);
        createStackedBarChart(stackedBarChartRef.current, categoryArray, budgetArray, expenses, selectedMonth);
      })
      .catch(error => {
        console.error('Error fetching budget information:', error);
      });
    }
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

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
  
      <label>Select Month:</label>
      <select onChange={handleMonthChange} value={selectedMonth}>
        <option value="">All Months</option>
        {months.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>
  
      <h2 style={{ textAlign: 'center' }}>Budget vs Expenses</h2>
      <canvas id="budgetExpenseChart" ref={chartRef} width="800" height="400"></canvas>
  
      <h2 style={{ textAlign: 'center' }}>Expenses Breakdown</h2>
      <canvas id="expensePieChart" ref={pieChartRef} width="400" height="400"></canvas>
  
      <h2 style={{ textAlign: 'center' }}>Budget Breakdown</h2>
      <canvas id="budgetPieChart" ref={budgetPieChartRef} width="400" height="400"></canvas>

      <h2 style={{ textAlign: 'center' }}>Doughnut Chart: Expenses vs Budget</h2>
      <canvas id="doughnutChart" ref={doughnutChartRef} width="400" height="400"></canvas>

      <h2 style={{ textAlign: 'center' }}>Stacked Bar Chart: Expenses vs Budget</h2>
      <canvas id="stackedBarChart" ref={stackedBarChartRef} width="400" height="400"></canvas>
    </div>
  );
}

export default DashboardPage;
