import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SortAndFilterExpenses = () => {
  const router = useNavigate();
  const getuserdata = useSelector((state) => state.userReducer.currentUser);
  const reduxdata = getuserdata?.data?.expenses || []; // Ensure reduxdata is an array, even if undefined
  const id = getuserdata?.data?._id;

  const [sortedExpenses, setSortedExpenses] = useState([...reduxdata]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (reduxdata) {
      setSortedExpenses([...reduxdata]);
    }
  }, [reduxdata]);

  const handleSort = () => {
    const sorted = [...sortedExpenses].sort((a, b) => a.category.localeCompare(b.category));
    setSortedExpenses(sorted);
  };

  const handleFilterByCategory = () => {
    if (selectedCategory === '') {
      setSortedExpenses([...reduxdata]);
    } else {
      const filteredExpenses = reduxdata.filter((expense) => expense.category === selectedCategory);
      setSortedExpenses(filteredExpenses);
    }
  };

  const handleSearchByDate = () => {
    if (startDate === '' && endDate === '') {
      setSortedExpenses([...reduxdata]);
    } else {
      const filteredExpenses = reduxdata.filter((expense) => {
        const expenseDate = new Date(expense.date);
        const start = startDate === '' || new Date(startDate) <= expenseDate;
        const end = endDate === '' || new Date(endDate) >= expenseDate;
        return start && end;
      });
      setSortedExpenses(filteredExpenses);
    }
  };

  const handleSearch = () => {
    if (searchTerm === '') {
      setSortedExpenses([...reduxdata]);
    } else {
      const filteredExpenses = reduxdata.filter(
        (expense) =>
          expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          expense.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSortedExpenses(filteredExpenses);
    }
  };

  const handleUpdate = (expense_id) => {
    console.log(expense_id, 'idddd');
    router(`/updateExpense/${expense_id}`);
  };

  const handleDelete = async (expense_id) => {
    console.log(expense_id, 'idddd');
    try {
      const response = await axios.post('http://localhost:8000/api/deleteExpense', {
        expense_id,
        id,
      });
      if (response?.data?.success) {
        if (window.confirm('Are you sure you want to delete this expense?')) {
          window.location.reload();
        }
      }
    } catch (error) {
      if (!error.response.data.success) {
        alert(error.response.data.message);
      }
    }
  };

  const handlemore = () => {
    router("/addexpense")
  };

  return (
    <>
      <div className='w-[100%] h-16 flex items-center justify-between mb-8 bg-stone-200 border'>
        <div>
          <label htmlFor="category"></label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Housing">Housing</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
          <button className='ml-5 w-36 h-10 rounded-md border bg-slate-600 text-white' onClick={handleFilterByCategory}>Filter by Category</button>
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button className='ml-5 min-w-32 h-10 rounded-md border bg-slate-600 text-white' onClick={handleSearchByDate}>Search by Date</button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch();
            }}
          />
          <button className='ml-5 w-20 h-10 rounded-md border bg-slate-600 text-white' onClick={handleSort}>Search</button>
        </div>
      </div>
      <div className='flex items-center justify-end'>
        <button className='flex items-center w-20 h-10 rounded-md border bg-slate-600 text-white' onClick={handlemore}>Add More</button>
      </div>
      <div>
        {reduxdata ? (
          sortedExpenses?.map((expense, index) => (
            <div
              className="group w-[40%] h-40 m-auto mb-4 border border-red-300 flex flex-col items-left p-2 rounded shadow-slate-700 hover:bg-stone-200 ease-in-out"
              key={index}
            >
              <p className="mb-1">
                <span className="font-bold">Category:</span> {expense.category}
              </p>
              <p className="mb-1">
                <span className="font-bold">Description:</span> {expense.description}
              </p>
              <p className="mb-1">
                <span className="font-bold">Amount:</span> {expense.amount}
              </p>
              <p className="mb-1">
                <span className="font-bold">Date:</span> {expense.date}
              </p>
              <div>
                <button
                  className="w-28 bg-blue-500 text-white py-1 px-3 rounded mr-2"
                  onClick={() => handleUpdate(expense._id)}
                >
                  Update
                </button>
                <button
                  className="w-28 bg-red-500 text-white py-1 px-3 rounded"
                  onClick={() => handleDelete(expense._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your Expense List is Empty...</p>
        )}
      </div>
    </>
  );
};

export default SortAndFilterExpenses;
