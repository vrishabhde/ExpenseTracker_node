import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const Addexpense = () => {
    const getuserdata = useSelector((state) => state.userReducer.currentUser);
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
        if(id){
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
                setexpense({ category: "", description: "", amount: 0 });
            }else{
                alert("something went wrong")
            }
        
        } catch (error) {
            console.error("Error occurred in Addexpense component", error);
            alert(error.response.data.message);
        }
    }else{
        alert("you are not logged in ")
    }
    }

    return (
        <>
            <form onSubmit={handlesubmit}>
                <h2>Expenses</h2>

                <div>
                    <label>Category:</label>
                    <input type="text" onChange={handlechange} name="category" value={expense.category} />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" onChange={handlechange} name="description" value={expense.description} />
                </div>
                <div>
                    <label>Amount:</label>
                    <input type="number" onChange={handlechange} name="amount" value={expense.amount} />
                </div>
                <button type="submit">Add Expense</button>
            </form>
        </>
    );
};

export default Addexpense;
