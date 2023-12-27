import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import Budget from "./Budget";
import Income from "./Income";
import Savings from "./Savings";
import GetExpenses from "./GetExpenses";

const Addexpense = () => {
    const getuserdata = useSelector((state) => state.userReducer.currentUser);
    console.log(getuserdata, "getUserdata")
    const [expense, setexpense] = useState({ category: "", description: "", amount: 0 });

    const handlechange = (e) => {
        setexpense({
            ...expense,
            [e.target.name]: e.target.value
        });
    }

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

    return (
        <>
    
  <div className="flex">
    <div className="w-1/2 p-4 border-r">
      <div className="mb-4">
        <h2 className="text-lg font-bold">List of Your Expenses</h2>
        {getuserdata ? <GetExpenses /> : <p>Loading...</p>}
      </div>
    </div>
    <div className="w-1/2 p-4">
      <div>
        {getuserdata ? (
          <>
            <Income />
            <Budget />
            <Savings />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <form onSubmit={handlesubmit} className="mt-4">
        <h2 className="text-lg font-bold">Add Expense</h2>

        <div className="mb-4">
          <label className="block text-sm font-bold">Category:</label>
          <input
            type="text"
            onChange={handlechange}
            name="category"
            value={expense.category}
            className="w-full border p-2"
          />
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
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
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
