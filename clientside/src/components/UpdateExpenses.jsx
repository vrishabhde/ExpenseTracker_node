import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UpdateExpenses = () => {
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
            window.location.reload();
          }
        } catch (error) {
          if(!error.response.data.success){
            alert(error.response.data.message);
          }
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Category:</label>
                <input
                    type="text"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                />

                <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={expense.description}
                    onChange={handleChange}
                />

                <label>Amount:</label>
                <input
                    type="number"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />

                <input type="submit" value="Update Expense" />
            </form>
        </>
    );
};

export default UpdateExpenses;
