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
    return (
      <div className="expense-table-card">
        <h3>📋 Recent Expenses</h3>
        <div className="empty-state">No expenses yet. Add your first one above! 👆</div>
      </div>
    );
  }

  return (
    <div className="expense-table-card">
      <h3>📋 Recent Expenses</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.date}</td>
              <td>{expense.description}</td>
              <td><span className="category-badge">{expense.category}</span></td>
              <td style={{ color: '#a5b4fc', fontWeight: 600 }}>₹{expense.amount}</td>
              <td>
                <button className="btn-delete" onClick={() => handleDelete(expense.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;