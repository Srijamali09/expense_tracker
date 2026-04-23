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

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const total = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Expense Tracker</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
      <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', textAlign: 'center' }}>
        <h2>Total Spent: ₹{total.toFixed(2)}</h2>
      </div>
      <AddExpense onExpenseAdded={fetchExpenses} />
      <SpendingChart expenses={expenses} />
      <ExpenseList expenses={expenses} onExpenseDeleted={fetchExpenses} />
    </div>
  );
}

export default Dashboard;