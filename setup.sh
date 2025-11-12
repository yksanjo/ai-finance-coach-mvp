#!/bin/bash

echo "🚀 Setting up AI Finance Coach MVP..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

echo "✅ Setup complete!"
echo ""
echo "To start the application, run:"
echo "  npm run dev"
echo ""
echo "Or start them separately:"
echo "  Terminal 1: npm run server"
echo "  Terminal 2: npm run client"

