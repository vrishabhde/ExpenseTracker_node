
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const GetExpenses = () => {
    const router = useNavigate();
    const getuserdata = useSelector((state) => state.userReducer.currentUser);

    const reduxdata = getuserdata?.data?.expenses;
const id = getuserdata?.data?._id
        const handleupdate = (expense_id) => {
            console.log(expense_id,"idddd")
            router(`/updateExpense/${expense_id}`);
        }

        const handledelete =async (expense_id) => {
            console.log(expense_id,"idddd")
            try {
                const response=await axios.post(`http://localhost:8000/api/deleteExpense`,{expense_id,id});
                if(response?.data?.success){
                    alert(response?.data?.message)
                    window.location.reload();
                }
            } catch (error) {
                if(!error.response.data.success){
                    alert(error.response.data.message)
                }
            }
            // router(`/deleteExpense/${expense_id}`);
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
                    
                        <button onClick={()=>handledelete(e._id)} >Delete</button>
                    </div>
                )) : <p>loading..</p>}
            </div>
        </>
    )
}

export default GetExpenses;