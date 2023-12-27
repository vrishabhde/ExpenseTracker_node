import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateExpenses = () => {
    const router = useNavigate();
    const { expense_id } = useParams();
    const getuserdata = useSelector((state) => state.userReducer.currentUser);
    const expensearray = getuserdata?.data?.expenses;

    const [expense, setexpense] = useState([{ category: "", description: "", amount: 0 }])
    

    const handleChange = (e) => {
        setexpense({ ...expense, [e.target.name]: e.target.value });
    }
    console.log(expense_id, "snehal");

    useEffect(() => {
        if(expensearray){
        for (var i = 0; i < expensearray.length; i++) {
            console.log("working", expensearray[i]._id)
            if (expensearray[i]._id === expense_id) {
                console.log(expensearray[i]._id, "id milala")
                setexpense(expensearray[i])
               
            }
        }
    }
    }, [expensearray])
console.log(expense,"single_expense")
  
 
    const handleSubmit =async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`http://localhost:8000/api/updateExpense`, {
                category: expense?.category,
                description: expense?.description,
                amount: expense?.amount,
                id: getuserdata?.data?._id,
                expense_id
            });
          console.log(response, "response")
          if(response.data.success){
            alert(response.data.message)
            router("/addexpense")
            window.location.reload()
          }
        } catch (error) {
          if(!error.response.data.success){
            alert(error.response.data.message);
          }
        }
    }
    return (
        <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out">
  <div className="mb-4">
    <label htmlFor="category" className="block text-sm font-bold mb-2">Category:</label>
    <input
      type="text"
      id="category"
      name="category"
      value={expense.category}
      onChange={handleChange}
      className="w-full border p-2 rounded"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="description" className="block text-sm font-bold mb-2">Description:</label>
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
    <label htmlFor="amount" className="block text-sm font-bold mb-2">Amount:</label>
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
    className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
  />
</form>


        </>
    );
};

export default UpdateExpenses;
