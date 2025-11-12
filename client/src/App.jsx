import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';
import Insights from './components/Insights';
import './App.css';

const API_URL = 'http://localhost:3001/api';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [expensesRes, summaryRes, insightsRes] = await Promise.all([
        axios.get(`${API_URL}/expenses`),
        axios.get(`${API_URL}/summary`),
        axios.get(`${API_URL}/insights`)
      ]);
      
      setExpenses(expensesRes.data);
      setSummary(summaryRes.data);
      setInsights(insightsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    try {
      const response = await axios.post(`${API_URL}/expenses`, expense);
      setExpenses([response.data, ...expenses]);
      fetchData(); // Refresh summary and insights
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense. Please try again.');
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/expenses/${id}`);
      setExpenses(expenses.filter(exp => exp.id !== id));
      fetchData(); // Refresh summary and insights
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>💰 AI Finance Coach</h1>
        <p>Track your expenses with AI-powered insights</p>
      </header>

      <main className="app-main">
        <div className="dashboard-section">
          <Dashboard summary={summary} />
          <Insights insights={insights} />
        </div>

        <div className="expense-section">
          <ExpenseForm onAdd={handleAddExpense} />
          <ExpenseList 
            expenses={expenses} 
            onDelete={handleDeleteExpense}
          />
        </div>
      </main>
    </div>
  );
}

export default App;

