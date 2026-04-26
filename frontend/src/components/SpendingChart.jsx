import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#667eea', '#11998e', '#f093fb', '#f5576c', '#4facfe', '#43e97b', '#fa709a', '#fee140'];

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
    <div className="chart-card">
      <h3>📊 Spending by Category</h3>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={110}
            dataKey="value"
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`₹${value}`, name]}
            contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
          />
          <Legend
            formatter={(value, entry) => `${value} (${((entry.payload.value / data.reduce((s, d) => s + d.value, 0)) * 100).toFixed(0)}%)`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;