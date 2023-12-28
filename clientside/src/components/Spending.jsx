
import { useSelector } from "react-redux";

const Spending = () => {
    const getuserdata = useSelector((state) => state.userReducer.currentUser);
    console.log(getuserdata,"getuserdatata")
  
    
    return (
        <>
       <div className="group w-[70%] h-16 mb-2 flex flex-col items-left p-4 rounded  hover:bg-blue-200 ease-in-out ">
        <p className=" text-xl font-bold"> Total Spending : ₹ {getuserdata?.data?.savings}</p>
        
        </div>
        </>
    )
}
export default Spending;