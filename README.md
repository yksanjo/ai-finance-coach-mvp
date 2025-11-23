# 💰 AI Finance Coach MVP

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://www.javascript.com/) [![GitHub stars](https://img.shields.io/github/stars/yksanjo/ai-finance-coach-mvp?style=social)](https://github.com/yksanjo/ai-finance-coach-mvp/stargazers) [![GitHub forks](https://img.shields.io/github/forks/yksanjo/ai-finance-coach-mvp.svg)](https://github.com/yksanjo/ai-finance-coach-mvp/network/members) [![GitHub issues](https://img.shields.io/github/issues/yksanjo/ai-finance-coach-mvp.svg)](https://github.com/yksanjo/ai-finance-coach-mvp/issues)
[![Last commit](https://img.shields.io/github/last-commit/yksanjo/ai-finance-coach-mvp.svg)](https://github.com/yksanjo/ai-finance-coach-mvp/commits/main)


An AI-powered personal finance tracking application that automatically categorizes expenses and provides insights to help you manage your money better.

## ✨ Features

- **Expense Tracking**: Add and manage your daily expenses
- **AI Categorization**: Automatically categorizes expenses based on description
- **Spending Dashboard**: Visual overview of your spending by category
- **AI Insights**: Get personalized insights about your spending habits
- **Category Breakdown**: See detailed spending by category with charts

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-finance-coach-mvp
```

2. Install all dependencies:
```bash
npm run install-all
```

Or install manually:
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Running the Application

Start both the server and client in development mode:

```bash
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Start backend server
npm run server

# Terminal 2 - Start frontend client
npm run client
```

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 📁 Project Structure

```
ai-finance-coach-mvp/
├── server/                 # Backend API
│   ├── index.js           # Express server and routes
│   ├── package.json
│   └── finance.db         # SQLite database (created automatically)
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── package.json           # Root package.json
└── README.md
```

## 🎯 API Endpoints

- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Add a new expense
- `DELETE /api/expenses/:id` - Delete an expense
- `GET /api/summary` - Get spending summary by category
- `GET /api/insights` - Get AI-powered insights
- `GET /api/monthly` - Get monthly spending trends
- `GET /api/health` - Health check

## 🤖 AI Categorization

The app uses intelligent keyword matching to automatically categorize expenses:

- **Food & Dining**: restaurant, cafe, coffee, grocery, etc.
- **Transportation**: uber, gas, parking, flight, etc.
- **Shopping**: amazon, store, retail, etc.
- **Entertainment**: movie, netflix, game, etc.
- **Bills & Utilities**: electric, internet, phone, etc.
- **Healthcare**: pharmacy, doctor, medical, etc.
- **Education**: school, course, book, etc.
- **Personal Care**: haircut, gym, spa, etc.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Recharts
- **Backend**: Node.js, Express
- **Database**: SQLite
- **Styling**: CSS3 with modern gradients

## 📝 License

MIT License - feel free to use this project for learning or as a starting point for your own finance app!

## 🚢 Deployment

To deploy this application:

1. **Frontend**: Build and deploy to Vercel, Netlify, or GitHub Pages
   ```bash
   cd client
   npm run build
   ```

2. **Backend**: Deploy to Heroku, Railway, or Render
   - Make sure to set up environment variables
   - The SQLite database will be created automatically

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📧 Support

If you have questions or need help, please open an issue on GitHub.

---

Made with ❤️ for better financial management

