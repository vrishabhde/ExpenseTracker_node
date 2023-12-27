import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DeleteExpense = () =>{

    const { expense_id } = useParams();
    const getuserdata = useSelector((state) => state.userReducer.currentUser);
    const expensearray = getuserdata?.data?.expenses;

    return (
        <>
        <h1>delete the expenses</h1>
        </>
    )
}

export default DeleteExpense;