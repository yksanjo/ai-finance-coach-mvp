import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './Dashboard.css';

function Dashboard({ summary }) {
  if (!summary) {
    return (
      <div className="dashboard-card">
        <h2>Dashboard</h2>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#95A5A6'];

  const chartData = summary.categories.map((cat, index) => ({
    name: cat.category,
    value: parseFloat(cat.total).toFixed(2)
  }));

  return (
    <div className="dashboard-card">
      <h2>Spending Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-label">Total Spent</div>
          <div className="stat-value">${summary.totalSpending.toFixed(2)}</div>
        </div>
        <div className="stat-card transactions">
          <div className="stat-label">Transactions</div>
          <div className="stat-value">{summary.totalTransactions}</div>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="category-list">
        <h3>By Category</h3>
        {summary.categories.map((cat, index) => (
          <div key={cat.category} className="category-item">
            <div className="category-name">
              <span 
                className="category-dot"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              {cat.category}
            </div>
            <div className="category-amount">
              ${parseFloat(cat.total).toFixed(2)}
              <span className="category-count">({cat.count})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

