#!/bin/bash

# AI Placement Interview Simulator - Setup Script
# This script sets up the entire project for development

set -e

echo "=========================================="
echo "Interview Simulator Setup Script"
echo "=========================================="

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[*]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# Check Node.js installation
print_status "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    print_warning "Node.js is not installed. Please install Node.js v16+ from nodejs.org"
    exit 1
fi
print_success "Node.js $(node -v) is installed"

# Check npm installation
print_status "Checking npm installation..."
if ! command -v npm &> /dev/null; then
    print_warning "npm is not installed"
    exit 1
fi
print_success "npm $(npm -v) is installed"

# Setup Backend
print_status "Setting up backend..."
cd backend

# Copy environment file
if [ ! -f .env ]; then
    print_status "Creating .env file..."
    cp .env.example .env
    print_warning "Please update backend/.env with your configuration:"
    echo "  - MONGODB_URI (or use default for local MongoDB)"
    echo "  - JWT_SECRET (use a strong random string)"
    echo "  - CLAUDE_API_KEY (get from Anthropic)"
fi

# Install backend dependencies
print_status "Installing backend dependencies..."
npm install
print_success "Backend dependencies installed"

cd ..

# Setup Frontend
print_status "Setting up frontend..."
cd frontend

# Create .env if doesn't exist
if [ ! -f .env ]; then
    print_status "Creating .env file..."
    echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
fi

# Install frontend dependencies
print_status "Installing frontend dependencies..."
npm install
print_success "Frontend dependencies installed"

cd ..

# Git setup
if [ ! -d .git ]; then
    print_status "Initializing git repository..."
    git init
    git config user.email "developer@interviewsimulator.com"
    git config user.name "Interview Simulator Dev"
    git add .
    git commit -m "Initial commit: AI Placement Interview Simulator"
    print_success "Git repository initialized"
fi

print_success "Setup completed!"
echo ""
echo "=========================================="
echo "Next Steps:"
echo "=========================================="
echo ""
echo "1. Configure MongoDB:"
echo "   - Install MongoDB locally, OR"
echo "   - Use MongoDB Atlas (cloud)"
echo ""
echo "2. Update configuration files:"
echo "   - backend/.env with your API keys"
echo "   - CLAUDE_API_KEY from Anthropic Console"
echo ""
echo "3. Start development servers:"
echo "   - Terminal 1: cd backend && npm run dev"
echo "   - Terminal 2: cd frontend && npm start"
echo ""
echo "4. Open browser:"
echo "   - http://localhost:3000"
echo ""
echo "=========================================="
echo "For more information:"
echo "=========================================="
echo "- README.md - Project overview"
echo "- QUICKSTART.md - Quick start guide"
echo "- API_DOCUMENTATION.md - API endpoints"
echo "- DEPLOYMENT.md - Production deployment"
echo "- SCORING_SYSTEM.md - Scoring details"
echo ""
