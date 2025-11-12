const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize database
const dbPath = path.join(__dirname, 'finance.db');
const db = new sqlite3.Database(dbPath);

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    category TEXT,
    date TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS budgets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT UNIQUE,
    limit_amount REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// AI Categorization function
function categorizeExpense(description) {
  const desc = description.toLowerCase();
  
  const categories = {
    'Food & Dining': ['restaurant', 'cafe', 'coffee', 'food', 'dining', 'pizza', 'burger', 'lunch', 'dinner', 'breakfast', 'grocery', 'supermarket', 'market'],
    'Transportation': ['uber', 'lyft', 'taxi', 'gas', 'fuel', 'parking', 'metro', 'subway', 'bus', 'train', 'flight', 'airline'],
    'Shopping': ['amazon', 'store', 'shop', 'mall', 'retail', 'purchase', 'buy'],
    'Entertainment': ['movie', 'cinema', 'netflix', 'spotify', 'game', 'concert', 'theater', 'entertainment'],
    'Bills & Utilities': ['electric', 'water', 'internet', 'phone', 'utility', 'bill', 'subscription'],
    'Healthcare': ['pharmacy', 'doctor', 'hospital', 'medical', 'health', 'drug', 'clinic'],
    'Education': ['school', 'university', 'course', 'book', 'education', 'tuition'],
    'Personal Care': ['haircut', 'salon', 'spa', 'gym', 'fitness', 'beauty'],
    'Other': []
  };

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => desc.includes(keyword))) {
      return category;
    }
  }
  
  return 'Other';
}

// API Routes

// Get all expenses
app.get('/api/expenses', (req, res) => {
  db.all('SELECT * FROM expenses ORDER BY date DESC, created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add expense
app.post('/api/expenses', (req, res) => {
  const { description, amount, date } = req.body;
  
  if (!description || !amount || !date) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const category = categorizeExpense(description);
  const formattedDate = new Date(date).toISOString().split('T')[0];

  db.run(
    'INSERT INTO expenses (description, amount, category, date) VALUES (?, ?, ?, ?)',
    [description, amount, category, formattedDate],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        id: this.lastID,
        description,
        amount,
        category,
        date: formattedDate
      });
    }
  );
});

// Delete expense
app.delete('/api/expenses/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM expenses WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Expense deleted', changes: this.changes });
  });
});

// Get expenses by category
app.get('/api/expenses/category/:category', (req, res) => {
  const category = req.params.category;
  db.all('SELECT * FROM expenses WHERE category = ? ORDER BY date DESC', [category], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get spending summary
app.get('/api/summary', (req, res) => {
  const query = `
    SELECT 
      category,
      SUM(amount) as total,
      COUNT(*) as count
    FROM expenses
    GROUP BY category
    ORDER BY total DESC
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    const totalSpending = rows.reduce((sum, row) => sum + row.total, 0);
    res.json({
      categories: rows,
      totalSpending: totalSpending,
      totalTransactions: rows.reduce((sum, row) => sum + row.count, 0)
    });
  });
});

// Get monthly spending
app.get('/api/monthly', (req, res) => {
  const query = `
    SELECT 
      strftime('%Y-%m', date) as month,
      SUM(amount) as total
    FROM expenses
    GROUP BY month
    ORDER BY month DESC
    LIMIT 12
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get AI insights
app.get('/api/insights', (req, res) => {
  const queries = {
    topCategory: `
      SELECT category, SUM(amount) as total
      FROM expenses
      GROUP BY category
      ORDER BY total DESC
      LIMIT 1
    `,
    recentSpending: `
      SELECT SUM(amount) as total
      FROM expenses
      WHERE date >= date('now', '-7 days')
    `,
    avgTransaction: `
      SELECT AVG(amount) as avg
      FROM expenses
    `
  };

  db.all(queries.topCategory, [], (err, topCategory) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    db.all(queries.recentSpending, [], (err, recent) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      db.all(queries.avgTransaction, [], (err, avg) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        const insights = [];
        
        if (topCategory.length > 0) {
          insights.push({
            type: 'info',
            message: `Your top spending category is ${topCategory[0].category} with $${topCategory[0].total.toFixed(2)}`
          });
        }

        if (recent.length > 0 && recent[0].total > 0) {
          insights.push({
            type: 'warning',
            message: `You've spent $${recent[0].total.toFixed(2)} in the last 7 days`
          });
        }

        if (avg.length > 0 && avg[0].avg > 0) {
          insights.push({
            type: 'tip',
            message: `Your average transaction is $${avg[0].avg.toFixed(2)}. Consider reviewing smaller purchases.`
          });
        }

        res.json(insights);
      });
    });
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Finance Coach API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Finance Coach API running on http://localhost:${PORT}`);
});

