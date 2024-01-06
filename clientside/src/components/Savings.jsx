import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Savings = () => {
  const router = useNavigate();
  const getuserdata = useSelector((state) => state.userReducer.currentUser);

  const expenseArray = getuserdata?.data?.expenses || [];

  const totalExpenses = expenseArray?.reduce((acc, expense) => acc + expense.amount, 0);
  const averageExpense = totalExpenses / (expenseArray?.length || 1);

  const highestExpense = expenseArray.length > 0 ? Math.max(...expenseArray.map((expense) => expense.amount)) : 0;
  const lowestExpense = expenseArray.length > 0 ? Math.min(...expenseArray.map((expense) => expense.amount)) : 0;

  const handleclick = () => {
    router("/addexpense");
  };

  const uniqueCategories = expenseArray.reduce((acc, expense) => {
    const category = expense.category;
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {});

  const categoriesArray = Object.entries(uniqueCategories).map(([category, amount]) => ({ category, amount }));

  return (
    <div className="mt-28 w-screen h-[600px] border flex flex-col justify-center items-center">
      <p className="font-semibold text-2xl mb-10">Expense Summary</p>
      <div className="w-[40%] h-[450px] border">
        <table className=" flex flex-col justify-evenly">
          <thead>
            <tr className="mt-1 flex justify-around">
              <th className="text-blue-600 ml-2">Total Expenses</th>
              <th className="text-green-600 ml-3">Lowest Expense</th>
              <th className="text-yellow-600">Average Expense</th>
              <th className="text-red-600">Highest Expense</th>
            </tr>
          </thead>
          <tbody>
            <tr className="flex justify-between">
              <td className="w-[25%] flex justify-center  bg-blue-400 text-base font-semibold">₹ {totalExpenses}</td>
              <td className="w-[25%] flex justify-center  bg-green-500 text-base font-semibold">₹ {lowestExpense}</td>
              <td className="w-[25%] flex justify-center  bg-yellow-400 text-base font-semibold">₹ {averageExpense.toFixed(2)}</td>
              <td className="w-[25%] flex justify-center  bg-red-500 text-base font-semibold">₹ {highestExpense}</td>
            </tr>
          </tbody>
        </table>

        <table className="w-[100%] flex flex-col justify-evenly items-center border ">
          <thead className="w-[50%]  mt-4 flex items-center border ">
            <tr className="w-[100%] flex justify-evenly">
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody className="w-[50%]  mt-4 flex flex-col items-center border ">
            {categoriesArray.map((categoryData) => (
              <tr className="w-[65%] border flex justify-between" key={categoryData.category}>
                <td className=" border border-red-100 ">{categoryData.category}</td>
                <td className=" border border-red-100 ">₹ {categoryData.amount}</td>
              </tr>
            ))}
            <button
              className="w-[190px] h-[30px] font-bold bg-pink-600 text-white rounded-md hover:bg-slate-900 mt-12"
              onClick={handleclick}
            >
              {" "}
              Add More Expenses{" "}
            </button>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Savings;
