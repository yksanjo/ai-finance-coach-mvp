import React from 'react';
import './Insights.css';

function Insights({ insights }) {
  if (!insights || insights.length === 0) {
    return (
      <div className="insights-card">
        <h2>AI Insights</h2>
        <div className="empty-insights">
          <p>Add some expenses to get AI-powered insights!</p>
        </div>
      </div>
    );
  }

  const getIcon = (type) => {
    switch (type) {
      case 'info':
        return 'ℹ️';
      case 'warning':
        return '⚠️';
      case 'tip':
        return '💡';
      default:
        return '📊';
    }
  };

  const getTypeClass = (type) => {
    return `insight-${type}`;
  };

  return (
    <div className="insights-card">
      <h2>AI Insights</h2>
      <div className="insights-list">
        {insights.map((insight, index) => (
          <div key={index} className={`insight-item ${getTypeClass(insight.type)}`}>
            <span className="insight-icon">{getIcon(insight.type)}</span>
            <p className="insight-message">{insight.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Insights;

