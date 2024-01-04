
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const Income = () => {
    const getuserdata = useSelector((state) => state.userReducer.currentUser);
    console.log(getuserdata,"getuserdata")
    const [income, setincome] = useState(0);

    const handlechange = (e) => {
        setincome(parseInt(e.target.value));
    }
    const handlesubmit =async (e) => {
       e.preventDefault();
       try {    
       
       const id = getuserdata.data._id;
       console.log(id,"id")
        const response =await axios.post("http://localhost:8000/api/income",{
            id,
            income
        });
        console.log(response,"response")
        if(response.data.success){
            alert(response.data.message);
            window.location.reload();
        }
       } catch (error) {
        alert("error occured in income component");
       }
    }
    return (
        // <>
        // <h1>Set Income</h1><h2>{getuserdata?.data?.income}</h2>
        // <form onSubmit={handlesubmit}>
        // <input type="number" placeholder="setincome" onChange={handlechange} name="income"  />
        // <input type="submit" value="setincome" />
        // </form>
        // </>
        <>
           <div className="group w-[100%] h-32 mb-2 flex flex-col items-left p-4 rounded  hover:bg-blue-200 ease-in-out">
                <h1 className="text-xl font-bold ">Your Wallet</h1>
                <p className="mb-2 text-xl font-bold ">₹ {getuserdata?.data?.income}</p>

                <form onSubmit={handlesubmit} className="mb-8">
                    <div className="flex">
                        <input
                            type="number"
                            placeholder="Set Income"
                            onChange={handlechange}
                            name="income"
                            className="w-80 border p-2 rounded-l"
                        />
                        <button
                            type="submit"
                            className="ml-8 w-72 bg-blue-500 text-white p-2 rounded-r hover:bg-blue-950"
                        >
                            Set Income
                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}
export default Income;