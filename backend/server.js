const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const aiRoutes = require('./routes/ai');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://expense-tracker-gaq7jkrc4-srijamali09s-projects.vercel.app',
  'https://expense-tracker-taupe-alpha-27.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('(.*)', cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('Expense Tracker API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});