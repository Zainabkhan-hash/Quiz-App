# 🎯 QuizMaster - JavaScript Certification Quiz App

A modern, interactive quiz application built with the MERN stack to help developers prepare for JavaScript certification exams. Features a beautiful glassmorphism UI, real-time scoring, and comprehensive question coverage.

![QuizMaster Banner](https://img.shields.io/badge/MERN-Quiz%20App-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)

## ✨ Features

### 🎨 User Interface
- **Glassmorphism Design** - Modern, elegant UI with frosted glass effects
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - Engaging transitions and hover effects
- **Visual Feedback** - Color-coded answers (green for correct, red for wrong)

### 📚 Quiz Features
- **150+ JavaScript MCQs** covering:
  - Variables & Data Types
  - Functions & Closures
  - Arrays & Objects
  - ES6+ Features
  - Async/Await & Promises
  - DOM Manipulation
  - And more...
- **Three Difficulty Levels**: Easy, Medium, Hard (50 questions each)
- **40-Minute Timer** for entire quiz
- **Random Question Selection** - Different questions each time
- **Progress Tracking** - Visual progress bar
- **Instant Feedback** - See correct answers after selection

### 🎵 Enhanced Experience
- **Sound Effects** - Audio feedback for correct/wrong answers
- **Timer Alerts** - Warning sounds when time is running low
- **Score Tracking** - Real-time score display

### 📊 Results & Analytics
- **Detailed Results Page** showing:
  - Final score and percentage
  - Correct vs wrong answers count
  - Circular progress visualization
  - Complete answer review with explanations
- **Performance Messages** - Motivational feedback based on score
- **Database Storage** - All results saved for future reference

## 🚀 Tech Stack

### Frontend
- **React 18** with Vite
- **React Router DOM** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling
- **Web Audio API** for sound effects

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **RESTful API** architecture
- **CORS** enabled

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed locally or MongoDB Atlas account
- npm or yarn package manager

### Clone Repository
```bash
git clone https://https://github.com/Zainabkhan-hash/Quiz-App.git
cd quiz-app
```

### Backend Setup
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start backend server
npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔌 API Endpoints

### Questions
- `GET /api/questions` - Get all questions
- `GET /api/questions/difficulty/:level` - Get questions by difficulty
- `GET /api/questions/random/:difficulty/:count` - Get random questions
- `POST /api/questions` - Add new question (admin)

### Results
- `GET /api/results` - Get all results (leaderboard)
- `GET /api/results/difficulty/:level` - Get results by difficulty
- `POST /api/results` - Save quiz result

## 🎮 How to Use

1. **Select Difficulty** - Choose Easy, Medium, or Hard
2. **Start Quiz** - Click "Start Quiz" button
3. **Answer Questions** - Click on your chosen answer
4. **Watch Timer** - Complete 50 questions in 40 minutes
5. **View Results** - See your score and review answers
6. **Try Again** - Retake with different questions


**Made with ❤️ and JavaScript**

*Happy Learning! 🚀*
```

