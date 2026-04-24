import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getExpenses } from '../api';
import AddExpense from '../components/AddExpense';
import ExpenseList from '../components/ExpenseList';
import SpendingChart from '../components/SpendingChart';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchExpenses(); }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const total = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
  const topCategory = expenses.length > 0
    ? Object.entries(expenses.reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + 1;
        return acc;
      }, {})).sort((a, b) => b[1] - a[1])[0][0]
    : 'None';

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-logo">💰 ExpenseTracker</div>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </nav>
      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="label">Total Spent</div>
            <div className="value purple">₹{total.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <div className="label">Transactions</div>
            <div className="value">{expenses.length}</div>
          </div>
          <div className="stat-card">
            <div className="label">Top Category</div>
            <div className="value" style={{ fontSize: '1.2rem' }}>{topCategory}</div>
          </div>
        </div>
        <AddExpense onExpenseAdded={fetchExpenses} />
        <SpendingChart expenses={expenses} />
        <ExpenseList expenses={expenses} onExpenseDeleted={fetchExpenses} />
      </div>
    </div>
  );
}

export default Dashboard;