import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Legend, Label } from 'recharts';

const PieChartExample = () => {
  const getuserdata = useSelector((state) => state.userReducer.currentUser);
  const expenseArray = getuserdata?.data?.expenses;

  let categoryAndAmount = [];
  if (expenseArray) {
    categoryAndAmount = expenseArray.map((item) => ({
      category: item.category,
      amount: item.amount,
    }));
    // Now 'categoryAndAmount' contains an array of objects with category and amount
    console.log(categoryAndAmount);
  }

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56'];

  return (
    <div>
      <h2>Expense Distribution</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={categoryAndAmount}
          dataKey="amount" 
        //   dataKey1="category"// Use "amount" as the dataKey since it represents the value of each segment
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        >       
          {categoryAndAmount.map((entry, index) => (
           <> <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
             <Label>{entry.category}</Label> </>
          ))}
        </Pie>

        {/* <Pie
          data={categoryAndAmount}
          dataKey="amount" // Use "amount" as the dataKey since it represents the value of each segment
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        >      
          {categoryAndAmount.map((entry, index) => (
           <> <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
           <Label>{entry.category}</Label>
          
             </>
          ))}
        </Pie> */}
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartExample;
