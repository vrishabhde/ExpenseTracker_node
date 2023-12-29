
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
                   window.confirm('Are you sure you want to delete this expense?');
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
  <h1 className="text-2xl font-bold mb-5"></h1>
  <div>
    {reduxdata ? (
      reduxdata.map((e, i) => (
        <div className="group w-[100%] h-40 mb-4 border border-red-900 flex flex-col items-left p-2 rounded  hover:bg-blue-200 ease-in-out"
          // className=" h-40 border border-red-900 mb-4 p-2 rounded "
          key={i}
        >
          <p className="mb-1"><span className="font-bold">Category:</span> {e.category}</p>
          <p className="mb-1"><span className="font-bold">Description:</span> {e.description}</p>
          <p className="mb-1"><span className="font-bold">Amount:</span> {e.amount}</p>
          <p className="mb-1"><span className="font-bold">Date:</span> {e.date}</p>
           <div>

           <button
            className="w-28 bg-blue-500 text-white py-1 px-3 rounded mr-2"
            onClick={() => handleupdate(e._id)}
          >
            Update
          </button>
          <button
            className="w-28 bg-red-500 text-white py-1 px-3 rounded"
            onClick={() => handledelete(e._id)}
          >
            Delete
          </button>
           </div>
        </div>
      ))
    ) : (
      <p>Loading...</p>
    )}
  </div>
  
</>

        </>
    )
}

export default GetExpenses;