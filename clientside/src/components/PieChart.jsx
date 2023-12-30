import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const PieChartExample = () => {
  const getuserdata = useSelector((state) => state.userReducer.currentUser);
  const expenseArray = getuserdata?.data?.expenses;

  let categoryAndAmount = [];
  if (expenseArray) {
    // Combine entries with the same category and sum their amounts
    const categoryMap = new Map();
    expenseArray.forEach((item) => {
      const category = item.category;
      if (categoryMap.has(category)) {
        categoryMap.set(category, categoryMap.get(category) + item.amount);
      } else {
        categoryMap.set(category, item.amount);
      }
    });

    // Convert the map back to an array of objects
    categoryAndAmount = Array.from(categoryMap, ([category, amount]) => ({
      category,
      amount,
    }));
  }

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#FF00FF', '#7CFC00'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        fontSize={12}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {categoryAndAmount[index].category}
      </text>
    );
  };

  return (
    <div>
      <h2 className='flex items-center justify-center font-bold text-2xl'>Category Summary</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={categoryAndAmount}
          dataKey="amount"
          cx={200}
          cy={150}
          outerRadius={80}
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}

          
        >
          {categoryAndAmount.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PieChartExample;
