import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#E74C3C', '#2ECC71', '#F39C12'];

function SpendingChart({ expenses }) {
  if (expenses.length === 0) return null;

  const categoryTotals = expenses.reduce((acc, expense) => {
    const cat = expense.category || 'Other';
    acc[cat] = (acc[cat] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2))
  }));

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>Spending by Category</h3>
      <PieChart width={400} height={300}>
        <Pie data={data} cx={200} cy={150} outerRadius={100} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `₹${value}`} />
        <Legend />
      </PieChart>
    </div>
  );
}

export default SpendingChart;