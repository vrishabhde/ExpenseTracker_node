
import { useSelector } from "react-redux";

const Spending = () => {
  const getuserdata = useSelector((state) => state.userReducer.currentUser);
  console.log(getuserdata, "getuserdatata")
  const expenseArray = getuserdata?.data?.expenses;
  console.log(expenseArray, "expenseArray")
  const sumOfamount = expenseArray?.reduce((sum, obj) => sum + obj.amount, 0);

  
  console.log(sumOfamount, "amount")
  return (
    <>
      <div className="group w-[100%] h-16 mb-2 flex flex-col items-left p-4 rounded  hover:bg-blue-200 ease-in-out ">
        <p className=" text-xl text-slate-600 font-bold "> Total Spending : ₹ {sumOfamount}</p>

      </div>
    </>
  )
}
export default Spending;