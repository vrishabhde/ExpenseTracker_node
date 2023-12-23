// import axios from "axios";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const Budget = () => {
    const getuserdata = useSelector((state) => state.userReducer.currentUser);
    console.log(getuserdata,"getuserdata")
    const [budget, setbudget] = useState(0);

    const handlechange = (e) => {
        setbudget({[e.target.name]:e.target.value});
    }
    const handlesubmit = (e) => {
       e.preventDefault();
       try {
       
       const id = getuserdata.data._id;
       console.log(id,"id")
        const response = axios.post("http://localhost:8000/api/budget",{
            id,
            budget
        });
        const axiosresponse = response.data;
        console.log(axiosresponse,"axiosresponse")
        if(axiosresponse.success){
            alert(axiosresponse.message);
        }
       } catch (error) {
        alert("error milala")
       }
    }
    return (
        


        <>
        <h1>Set Budget</h1>
        <form onSubmit={handlesubmit}>
        <input type="number" placeholder="setbudget" onChange={handlechange} name="budget"  />
        <input type="submit" value="setbudget" />
        </form>
        </>
    )
}
export default Budget;