import React from 'react';
import './ExpenseList.css';

function ExpenseList({ expenses, onDelete }) {
  const getCategoryColor = (category) => {
    const colors = {
      'Food & Dining': '#FF6B6B',
      'Transportation': '#4ECDC4',
      'Shopping': '#45B7D1',
      'Entertainment': '#FFA07A',
      'Bills & Utilities': '#98D8C8',
      'Healthcare': '#F7DC6F',
      'Education': '#BB8FCE',
      'Personal Care': '#85C1E2',
      'Other': '#95A5A6'
    };
    return colors[category] || '#95A5A6';
  };

  if (expenses.length === 0) {
    return (
      <div className="expense-list-card">
        <h2>Recent Expenses</h2>
        <div className="empty-state">
          <p>No expenses yet. Add your first expense above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list-card">
      <h2>Recent Expenses</h2>
      <div className="expense-list">
        {expenses.map(expense => (
          <div key={expense.id} className="expense-item">
            <div className="expense-info">
              <div className="expense-main">
                <h3>{expense.description}</h3>
                <span 
                  className="expense-category"
                  style={{ backgroundColor: getCategoryColor(expense.category) }}
                >
                  {expense.category}
                </span>
              </div>
              <div className="expense-meta">
                <span className="expense-date">{new Date(expense.date).toLocaleDateString()}</span>
                <span className="expense-amount">${parseFloat(expense.amount).toFixed(2)}</span>
              </div>
            </div>
            <button 
              className="delete-btn"
              onClick={() => onDelete(expense.id)}
              aria-label="Delete expense"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;

