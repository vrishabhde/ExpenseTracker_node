import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import Budget from "./Budget";
import Income from "./Income";
import GetExpenses from "./GetExpenses";
import Spending from "./Spending";
import { useNavigate } from "react-router-dom";

const Addexpense = () => {
  const router = useNavigate();
  const getuserdata = useSelector((state) => state.userReducer.currentUser);
  console.log(getuserdata, "getUserdata")

  const [expense, setexpense] = useState({ category: "", description: "", amount: 0, date: Date });

  const handlechange = (e) => {
    setexpense({
      ...expense,
      [e.target.name]: e.target.value
    });
  }

  console.log(expense, "......................");

  const handlesubmit = async (e) => {
    e.preventDefault();
    const id = getuserdata?.data?._id;
    if (id) {
      try {
        const response = await axios.post("http://localhost:8000/api/addexpense", {
          id,
          category: expense.category,
          description: expense.description,
          amount: expense.amount,
          date: expense.date,
        });
        console.log(response, "response");
        if (response.data.success) {
          alert(response.data.message);
          window.location.reload();
          setexpense({ category: "", description: "", amount: 0 });
        } else {
          alert("something went wrong")
        }

      } catch (error) {
        console.error("Error occurred in Addexpense component", error);
        alert(error.response.data.message);
      }
    } else {
      alert("you are not logged in ")
    }
  }

  const handlesearch = () => {
    router("/sorting")
  }

  const handlesummary = () => {
    router("/saving")
  }

  return (
    <>
      <div className="pt-28 flex justify-between h-screen bg-stone-200">
        {/* Left Section */}
        <div className="w-[30%] p-4 border-r overflow-y-auto transition-all duration-300 ease-in-out">
          <div className="mb-4">
            {getuserdata?.data?.expenses.length !== 0 ?
              <>
                <div className="flex justify-between">
                  <h2 className="text-lg font-bold">List of Your Expenses</h2>
                  <button className="border w-20 rounded-md bg-slate-600 text-white pb-1" onClick={handlesearch}>search</button>
                  <button className="border w-20 rounded-md bg-slate-600 text-white pb-1" onClick={handlesummary}>Summary</button>
                </div>
                <div><GetExpenses /></div>
              </> :
              <p className="text-2xl text-red-600 ml-14 mt-52 font-bold">Your list is empty<br />Add Your expenses... </p>
            }
          </div>
        </div>

        {/* Middle Section */}
        <div className="w-[30%] h-[60%] mt-16 hover:bg-blue-200 p-4 transition-all duration-300 ease-in-out">
          <div>
            {getuserdata ? (
              <>
                <Income />
                <Budget />
                <Spending />
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="group w-[30%] mt-16 h-[80%] mb-2 flex flex-col items-left p-4 rounded hover:bg-blue-200 ease-in-out">
          <form onSubmit={handlesubmit} className="mt-4">
            <h2 className="text-lg font-bold mb-4">Add Expense</h2>

            <div className="mb-4">
              <label className="block text-sm font-bold">Category:</label>
              <select
                onChange={handlechange}
                name="category"
                value={expense.category}
                className="w-full border p-2"
              >
                <option value="" className="">Select a Category</option>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Housing">Housing</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold">Description:</label>
              <input
                type="text"
                onChange={handlechange}
                name="description"
                value={expense.description}
                className="w-full border p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold">Amount:</label>
              <input
                type="number"
                onChange={handlechange}
                name="amount"
                value={expense.amount}
                className="w-full border p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold">Date:</label>
              <input
                type="date"
                onChange={handlechange}
                name="date"
                value={expense.date}
                className="w-full border p-2"
              />
            </div>

            <button
              type="submit"
              className="ml-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-red-950 transition-all duration-300 ease-in-out"
            >
              Add Expense
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addexpense;
