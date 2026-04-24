import { useState } from 'react';
import { addExpense, categoriseExpense } from '../api';

function AddExpense({ onExpenseAdded }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCategorise = async () => {
    if (!description) return;
    setLoading(true);
    try {
      const res = await categoriseExpense(description);
      setCategory(res.data.category);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addExpense({ amount, description, category, date });
      setAmount(''); setDescription(''); setCategory(''); setDate('');
      onExpenseAdded();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add-expense-card">
      <h3>➕ Add New Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <input className="form-input" type="number" placeholder="Amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          <input className="form-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="desc-row">
          <input className="form-input" type="text" placeholder="Description (e.g. Zomato order)" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <button type="button" className="btn-ai" onClick={handleCategorise}>
            {loading ? '...' : '✨ AI Categorise'}
          </button>
        </div>
        <input className="form-input" type="text" placeholder="Category (auto-filled by AI)" value={category} onChange={(e) => setCategory(e.target.value)} style={{ marginBottom: '1rem' }} required />
        <button type="submit" className="btn-add">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;