import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GetExpenses = () => {
    const router = useNavigate();
    const getuserdata = useSelector((state) => state.userReducer.currentUser);
    console.log(getuserdata, "get expense list data");
    const reduxdata = getuserdata?.data?.expenses;

    // console.log(typeof(reduxdata[0].amount),"reduxdata")
    const [expenseList, setExpenseList] = useState([]);
    const id = getuserdata?.data?._id;
    // useEffect(() => {
    //     const getExpensesList = async () => {
    //         try {
    //             const response = await axios.post("http://localhost:8000/api/getExpenses", { id })
    //             if (response.data.success) {
    //                 setExpenseList(response.data.expensesList)
    //             }
    //         } catch (error) {

    //         }
    //     }
    //     getExpensesList();
    // }, [id])
    console.log(expenseList, "expenseLisgwgt")

        const handleupdate = (expense_id) => {
            console.log(expense_id,"idddd")
            router(`/updateExpense/${expense_id}`)
        }
    return (
        <>
            <h1>List of you Expenses</h1>
            <div>
                {reduxdata ? reduxdata?.map((e, i) => (
                    <div style={{ border: "1px solid red", marginBottom: "10px" }} key={i}>
                        <p>category: {e.category}</p>
                        <p>description: {e.description}</p>
                        <p>amount: {e.amount}</p>
                        <p>date: {e.date}</p>
                        <button onClick={()=>handleupdate(e._id)}>Update</button>
                        <button>Delete</button>
                    </div>
                )) : <p>loading..</p>}
            </div>
        </>
    )
}

export default GetExpenses;