
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
           <>
  <h1 className="text-2xl font-bold mb-4"></h1>
  <div>
    {reduxdata ? (
      reduxdata.map((e, i) => (
        <div
          className="border border-red-500 mb-4 p-4 rounded"
          key={i}
        >
          <p className="mb-2"><span className="font-bold">Category:</span> {e.category}</p>
          <p className="mb-2"><span className="font-bold">Description:</span> {e.description}</p>
          <p className="mb-2"><span className="font-bold">Amount:</span> {e.amount}</p>
          <p className="mb-2"><span className="font-bold">Date:</span> {e.date}</p>
          <button
            className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
            onClick={() => handleupdate(e._id)}
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white py-1 px-3 rounded"
            onClick={() => handledelete(e._id)}
          >
            Delete
          </button>
        </div>
      ))
    ) : (
      <p>Loading...</p>
    )}
  </div>
</>;

        </>
    )
}

export default GetExpenses;