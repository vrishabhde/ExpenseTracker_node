
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const Budget = () => {
    const getuserdata = useSelector((state) => state.userReducer.currentUser);
    console.log(getuserdata,"getuserdata")
    const [budget, setbudget] = useState(0);

    const handlechange = (e) => {
        setbudget(parseInt(e.target.value));
    }
    const handlesubmit =async (e) => {
       e.preventDefault();
       try {    
       
       const id = getuserdata.data._id;
       console.log(id,"id")
        const response =await axios.post("http://localhost:8000/api/budget",{
            id,
            budget
        });
        console.log(response,"response")
        if(response.data.success){
            alert(response.data.message);
        }
       } catch (error) {
        alert("error occured in budget component");
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