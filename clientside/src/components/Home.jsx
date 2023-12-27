import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    const [show, setShow] = useState(false);
    const getuserdata = useSelector((state) => state.userReducer.currentUser);

    const router = useNavigate();

    const handlelogin = () => {
        router("/login");
        setShow(true);
    };

    const handleExpense = () => {
        router("/addexpense");
        setShow(true);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
  <h1 className="text-4xl font-bold">Welcome To</h1>
  <h2 className="text-2xl mb-4">Expense Tracker Management System ...!</h2>

  {/* Enlarged image with Tailwind CSS styling */}
  <img
    src="https://source.unsplash.com/800x400/?expense-tracker" // Replace with your actual image URL
    alt="Expense Tracker"
    className="mb-4 rounded shadow-lg w-full lg:w-2/3 xl:w-1/2"
  />

  {getuserdata ? (
    <>
      {" "}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleExpense}
      >
        Add Your Expenses
      </button>
    </>
  ) : (
    <>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handlelogin}
      >
        Explore Now
      </button>
    </>
  )}
</div>

    );
};

export default Home;
