import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Savings = () => {
  const router = useNavigate();
  const getuserdata = useSelector((state) => state.userReducer.currentUser);

  const [selectedMonth, setSelectedMonth] = useState("all"); // Default to "all"
  const [selectedYear, setSelectedYear] = useState("all"); // Default to "all"

  const expenseArray = getuserdata?.data?.expenses || [];

  // Filter expenses based on selected month and year
  const filteredExpenses = expenseArray.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const isMonthValid = selectedMonth === "all" || expenseDate.getMonth() === parseInt(selectedMonth);
    const isYearValid = selectedYear === "all" || expenseDate.getFullYear() === parseInt(selectedYear);
    return isMonthValid && isYearValid;
  });

  const totalExpenses = filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);
  const averageExpense = totalExpenses / (filteredExpenses.length || 1);

  const highestExpense = filteredExpenses.length > 0 ? Math.max(...filteredExpenses.map((expense) => expense.amount)) : 0;
  const lowestExpense = filteredExpenses.length > 0 ? Math.min(...filteredExpenses.map((expense) => expense.amount)) : 0;

  const handleclick = () => {
    router("/addexpense");
  };

  const uniqueCategories = filteredExpenses.reduce((acc, expense) => {
    const category = expense.category;
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {});

  const categoriesArray = Object.entries(uniqueCategories).map(([category, amount]) => ({ category, amount }));

  const handleSearch = () => {
    console.log("Selected Month:", selectedMonth);
    console.log("Selected Year:", selectedYear);
  };

  return (
    <div className="mt-28 w-screen h-[600px] border flex flex-col justify-center items-center">
      <label className="mb-2">
        Select Month:
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="all">All</option>
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>
      </label>
      <label className="mb-2">
        Select Year:
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="all">All</option>
          {/* Add options for available years */}
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>

        </select>
      </label>
      <button onClick={handleSearch} className="w-[200px] h-[30px] rounded-md hover:bg-pink-200 border border-gray-100 mb-4 ml-2">Search by Month and Year</button>

      <p className="font-semibold text-2xl mb-10">Expense Summary</p>
      <div className="w-[40%] h-[450px] border">
        <table className="flex flex-col justify-evenly">
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
              <td className="w-[25%] flex justify-center bg-blue-400 text-base font-semibold">₹ {totalExpenses}</td>
              <td className="w-[25%] flex justify-center bg-green-500 text-base font-semibold">₹ {lowestExpense}</td>
              <td className="w-[25%] flex justify-center bg-yellow-400 text-base font-semibold">₹ {averageExpense.toFixed(2)}</td>
              <td className="w-[25%] flex justify-center bg-red-500 text-base font-semibold">₹ {highestExpense}</td>
            </tr>
          </tbody>
        </table>

        <table className="w-[100%] flex flex-col justify-evenly items-center border">
          <thead className="w-[50%] mt-4 flex items-center border">
            <tr className="w-[100%] flex justify-evenly">
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody className="w-[50%] mt-4 flex flex-col items-center border">
            {categoriesArray && categoriesArray.length !=0 ? 
            <>{categoriesArray.map((categoryData) => (
              <tr className="w-[65%] border flex justify-between" key={categoryData.category}>
                <td className="border border-red-100">{categoryData.category}</td>
                <td className="border border-red-100">₹ {categoryData.amount}</td>
              </tr>
            ))}</> :
            <><p className="text-2xl text-red-600 w-[500px] "> Expenses not found for selected month/year !</p></>
            }
            <button
              className="w-[190px] h-[30px] font-bold bg-pink-600 text-white rounded-md hover:bg-slate-900 mt-12"
              onClick={handleclick}
            >
              Add More Expenses
            </button>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Savings;
