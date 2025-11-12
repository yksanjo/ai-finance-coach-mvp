import React, { useState } from 'react';
import './ExpenseForm.css';

function ExpenseForm({ onAdd }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!description.trim() || !amount || !date) {
      alert('Please fill in all fields');
      return;
    }

    const expense = {
      description: description.trim(),
      amount: parseFloat(amount),
      date: date
    };

    onAdd(expense);
    
    // Reset form
    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="expense-form-card">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Coffee at Starbucks"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount ($)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;

