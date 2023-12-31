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
// const alternateImage = 'https://c8.alamy.com/comp/G5M409/expenses-concept-with-pie-chart-3d-rendering-isolated-on-white-background-G5M409.jpg';
  return (
    <>
    {getuserdata && getuserdata?.data?.expenses.length !== 0 ? 
    <>
      <div className='pt-28 '>
      
      <h1 className="bg-stone-200 flex items-center justify-center text-3xl pt-4 font-bold ">Welcome Back {getuserdata?.data?.firstname}...!</h1>
      <h2 className="bg-stone-200 flex items-center justify-center text-2xl ">Expense Management System</h2>
      <h2 className='justify-center flex bg-stone-200 '>Manage Your Personal Expenses Seamlessly</h2>
      </div>
      
    </> : 
    <> 
      
      <div className='pt-28'>
      <h1 className="bg-stone-200 flex items-center justify-center text-3xl font-bold pt-6 ">Welcome To</h1>
      <h2 className="bg-stone-200 flex items-center justify-center text-2xl ">Expense Management System ...!</h2>
      <h2 className='justify-center flex bg-stone-200 '>Manage Your Personal Expenses Seamlessly</h2>
      </div>
      
    </>
    }
    
          <div className="w-[100%] h-[600px] m-auto flex border items-center justify-center bg-stone-200">

        {getuserdata ? (
          <><div className="w-screen h-screen flex items-center justify-around">
            <div>
              <div>
               {getuserdata?.data?.expenses.length == 0 ? <><img className='w-96 h-80 mb-20 ml-10 border border-red-200' src="/expenseEmpty.jpg" /> </> : <><PieChartExample /></>} 
              </div>

            </div>
            <button
        className="bg-blue-500 text-white ml-24 mb-20 py-2 px-4 rounded hover:bg-blue-950"
        onClick={handleExpense}
      >
        Add Your Expenses
      </button>
            <img
              // src='https://assets.gqindia.com/photos/608c135f6e6a489a62cd254d/master/pass/Apps%20for%20finance%20management.jpg'
              // src="https://www.drupal.org/files/project-images/expense-income.png"
              src='https://thumbs.dreamstime.com/b/budget-expenses-folders-mean-business-finances-budgeting-meaning-38118025.jpg' 
              alt="Expense Tracker"
              className="w-[300px] h-[45%] mb-24 mt-6 rounded shadow-lg lg:w-1/3 xl:w-1/3"
            />

          </div>
          </>
        ) : (
          <>
            <div className='flex justify-around border items-center w-[73%] h-[100%] '>
              <img
                src='https://repository-images.githubusercontent.com/334569269/18f0ec80-6555-11eb-9c29-b518e321b59d'
                // src="https://assets.materialup.com/uploads/e3125e46-aa30-4a05-8409-cb532300faa1/preview.jpg" 
                alt="Expense Tracker"
                // className=" mb-24 rounded shadow-lg w-full lg:w-1/3 xl:w-1/2"
                className='w-[75%] h-[70%] shadow-lg mb-20 ml-28'
              />

              <button
                className="bg-blue-500 text-white py-2 px-4 rounded  mb-24 hover:bg-blue-950"
                onClick={handlelogin}
              >
                Explore Now
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
