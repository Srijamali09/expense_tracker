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
      setAmount('');
      setDescription('');
      setCategory('');
      setDate('');
      onExpenseAdded();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <input type="number" placeholder="Amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ padding: '8px' }} required />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ padding: '8px' }} required />
        </div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '8px', flex: 1 }} required />
          <button type="button" onClick={handleCategorise} style={{ padding: '8px 12px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {loading ? '...' : 'AI Categorise'}
          </button>
        </div>
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '8px', width: '100%', marginBottom: '1rem' }} required />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default AddExpense;