import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Legend, Label } from 'recharts';

const PieChartExample = () => {
  const getuserdata = useSelector((state) => state.userReducer.currentUser);
  const expenseArray = getuserdata?.data?.expenses;
console.log(expenseArray,"expenseArray")
  let categoryAndAmount = [];
  if (expenseArray) {
    categoryAndAmount = expenseArray.map((item) => ({
      category: item.category,
      amount: item.amount,
    }));
    console.log(categoryAndAmount);
  }

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56','#FF00FF','##7CFC00' ];

  return (
    <div>
      <h2 className='flex items-center justify-center font-semibold text-3xl'>Expense Chart</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={categoryAndAmount}
          dataKey="amount"
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {categoryAndAmount.map((entry, index) => (<>
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            <Label  dataKey="category"
            position="center"  >{entry.category}</Label> </>
          ))}
         
          
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartExample;
