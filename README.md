# 💰 ExpenseTracker — AI-Powered Personal Finance App

![ExpenseTracker Banner](https://img.shields.io/badge/ExpenseTracker-AI%20Powered-667eea?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-v22-339933?style=for-the-badge&logo=nodedotjs)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-3ECF8E?style=for-the-badge&logo=supabase)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

> A full-stack web application that helps users track their daily expenses with **AI-powered automatic categorisation**, real-time spending analytics, and a beautiful dark-themed dashboard.

🔗 **Live Demo:** [expense-tracker-taupe-alpha-27.vercel.app](https://expense-tracker-taupe-alpha-27.vercel.app)

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure signup and login with bcrypt password hashing
- 🤖 **AI Categorisation** — Automatically categorises expenses using intelligent keyword analysis
- 📊 **Interactive Charts** — Real-time pie chart showing spending breakdown by category
- 💳 **Expense Management** — Add, view, and delete expenses with instant UI updates
- 📱 **Responsive Design** — Clean dark-themed UI that works on all screen sizes
- 🗄️ **Cloud Database** — PostgreSQL hosted on Supabase with persistent data storage

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|-----------|---------|
| React 18 + Vite | UI framework and build tool |
| React Router DOM | Client-side routing |
| Recharts | Interactive data visualisation |
| Axios | HTTP client for API calls |
| CSS3 | Custom dark theme with glassmorphism |

### Backend

| Technology | Purpose |
|-----------|---------|
| Node.js + Express | REST API server |
| PostgreSQL (Supabase) | Cloud database |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| dotenv | Environment variable management |

---

## 🏗️ Architecture
expense_tracker/
├── frontend/                 # React application
│   └── src/
│       ├── pages/
│       │   ├── Login.jsx     # Login page
│       │   ├── Signup.jsx    # Signup page
│       │   └── Dashboard.jsx # Main dashboard
│       ├── components/
│       │   ├── AddExpense.jsx    # Add expense form
│       │   ├── ExpenseList.jsx   # Expenses table
│       │   └── SpendingChart.jsx # Pie chart
│       └── api.js            # Centralised API calls
│
└── backend/                  # Node.js REST API
├── routes/
│   ├── auth.js           # Signup/Login endpoints
│   ├── expenses.js       # CRUD endpoints
│   └── ai.js             # AI categorisation
├── db.js                 # Database connection
└── server.js             # Express server entry point
---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm
- Supabase account (free)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Srijamali09/expense_tracker.git
cd expense_tracker
```

**2. Setup Backend**

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```env
DATABASE_URL=your_supabase_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

**3. Setup Database**

Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  amount DECIMAL NOT NULL,
  description TEXT,
  category VARCHAR,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**4. Setup Frontend**

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend folder:

```env
VITE_API_URL=http://localhost:5000
```

**5. Run the application**

Backend:
```bash
cd backend
npx nodemon server.js
```

Frontend:
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` 🎉

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create new account |
| POST | `/api/auth/login` | Login and get JWT token |

### Expenses

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses (auth required) |
| POST | `/api/expenses` | Add new expense (auth required) |
| DELETE | `/api/expenses/:id` | Delete expense (auth required) |

### AI

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/categorise` | Auto-categorise expense description |

---

## 🔒 Security Features

- Passwords hashed with **bcryptjs** (10 salt rounds)
- **JWT tokens** with 7-day expiration
- **CORS** enabled for cross-origin requests
- Environment variables for all sensitive data
- `.env` file excluded from version control

---

## 📈 What I Learned

- Building a complete **REST API** with Node.js and Express
- **JWT authentication** flow from scratch
- Connecting a **PostgreSQL database** using connection pooling
- **React state management** with hooks (useState, useEffect)
- **Client-side routing** with React Router
- Integrating **AI/ML APIs** into a full-stack application
- **Deploying** a full-stack app with separate frontend and backend hosting
- Using **Git** for version control with meaningful commit messages

---

## 🚧 Future Improvements

- [ ] Monthly budget limits with alerts
- [ ] Export expenses to CSV/PDF
- [ ] Dark/Light theme toggle
- [ ] Multi-currency support
- [ ] Mobile app with React Native

---

## 👩‍💻 Author

**Srija Mali**
- GitHub: [@Srijamali09](https://github.com/Srijamali09)

---

## 📄 License

This project is licensed under the MIT License.

---

⭐ If you found this project helpful, please give it a star!
