import { deleteExpense } from '../api';

function ExpenseList({ expenses, onExpenseDeleted }) {
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      onExpenseDeleted();
    } catch (err) {
      console.error(err);
    }
  };

  if (expenses.length === 0) {
    return <p style={{ textAlign: 'center', color: '#888' }}>No expenses yet. Add one above!</p>;
  }

  return (
    <div>
      <h3>Your Expenses</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Date</th>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Description</th>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Category</th>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Amount</th>
            <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{expense.date}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{expense.description}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{expense.category}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>₹{expense.amount}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button onClick={() => handleDelete(expense.id)} style={{ padding: '4px 10px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;