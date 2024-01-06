import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateExpenses = () => {
  const router = useNavigate();
  const { expense_id } = useParams();
  const getuserdata = useSelector((state) => state.userReducer.currentUser);
  const expensearray = getuserdata?.data?.expenses;

  const [expense, setExpense] = useState({
    category: "", 
    description: "",
    amount: 0,
  });
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (expensearray) {
      for (var i = 0; i < expensearray.length; i++) {
        if (expensearray[i]._id === expense_id) {
          setExpense(expensearray[i]);
          break; // No need to continue searching after finding the expense
        }
      }
    }
  }, [expensearray, expense_id]);

  useEffect(() => {
    // Fetch predefined categories from your API or use a static list
    const predefinedCategories = ["Food", "Transportation", "Housing", "Entertainment", "Other"];
    setCategories(predefinedCategories);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8000/api/updateExpense`, {
        category: expense?.category,
        description: expense?.description,
        amount: expense?.amount,
        id: getuserdata?.data?._id,
        expense_id,
      });

      if (response.data.success) {
        alert(response.data.message);
        router("/addexpense");
        window.location.reload();
      }
    } catch (error) {
      if (!error.response.data.success) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="mt-32 w-screen h-[500px] m-auto flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-80 h-100 m-auto flex flex-col justify-center items-center border border-red-300 bg-white p-6 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out"
      >
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-bold mb-2">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={expense.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-bold mb-2">
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={expense.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-bold mb-2">
            Amount:
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <input
          type="submit"
          value="Update Expense"
          className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-950 transition duration-300 ease-in-out"
        />
      </form>
    </div>
  );
};

export default UpdateExpenses;
