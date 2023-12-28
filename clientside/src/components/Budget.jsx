
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const Budget = () => {
    const getuserdata = useSelector((state) => state.userReducer.currentUser);
    console.log(getuserdata, "getuserdatata")
    const [budget, setbudget] = useState(0);

    const handlechange = (e) => {
        setbudget(parseInt(e.target.value));
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const id = getuserdata?.data._id;
            console.log(id, "id")
            const response = await axios.post("http://localhost:8000/api/budget", {
                id,
                budget
            });
            console.log(response, "response")
            if (response.data.success) {
                alert(response.data.message);
                window.location.reload();
                setbudget({ amount: 0 });

            }
        } catch (error) {
            console.log(error.response.data, "errorrrrr")
            if (!error.response.data.success) {
                alert(error.response.data.message);
                window.location.reload();
            }
        }
    }
    return (
        <>
     <div className="group w-[100%] h-32 mb-2 flex flex-col items-left p-4 rounded  hover:bg-blue-200 ease-in-out ">
    <h1 className="text-xl font-bold ">Your Budget</h1>
    <p className="mb-2 text-xl font-bold ">₹ {getuserdata?.data?.budget}</p>

    <form onSubmit={handlesubmit} className="mb-8">
        <div className="flex">
            <input
                type="number"
                placeholder="Set Budget"
                onChange={handlechange}
                name="budget"
                className="w-80 border p-2 rounded-l"
            />
            <button
                type="submit"
                className="ml-8 w-72 bg-blue-500 text-white p-2 rounded-r hover:bg-blue-950"
            >
                Set Budget
            </button>
        </div>
    </form>
</div>



        </>


    )
}
export default Budget;