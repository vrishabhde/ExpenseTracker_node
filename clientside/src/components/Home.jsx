import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PieChartExample from './PieChart';


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
      <>
      <h1 className="bg-stone-200 flex items-center justify-center text-4xl font-bold ">Welcome To</h1>
      <h2 className="bg-stone-200 flex items-center justify-center text-2xl ">Expense Tracker Management System ...!</h2>
    
        <div className="w-100 flex items-center justify-center h-[550px] bg-stone-200">
  

  {getuserdata ? (
    <><div className="w-screen h-screen flex items-center justify-between">
      <PieChartExample />
      <img
  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmYba2MCZi3SkXcAk2Hp_CcCe5NJ-becrVhg&usqp=CAU'
    // src="https://repository-images.githubusercontent.com/419507496/cfcc1354-86ac-432e-823a-da56c21302ba" 
    alt="Expense Tracker"
    className="mb-2 rounded shadow-lg w-full lg:w-2/3 xl:w-1/2"
  />

      <button
        className="bg-blue-500 text-white mt-4 py-2 px-4 rounded  hover:bg-blue-950"
        onClick={handleExpense}
      >
        Add Your Expenses
      </button>
  
      </div>
    </>
  ) : (
    <>
     <img
  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmYba2MCZi3SkXcAk2Hp_CcCe5NJ-becrVhg&usqp=CAU'
    // src="https://repository-images.githubusercontent.com/419507496/cfcc1354-86ac-432e-823a-da56c21302ba" 
    alt="Expense Tracker"
    className="mb-2 rounded shadow-lg w-full lg:w-2/3 xl:w-1/2"
  />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4  hover:bg-blue-950"
        onClick={handlelogin}
      >
        Explore Now
      </button>
    </>
  )}
</div>
</>
    );
};

export default Home;
