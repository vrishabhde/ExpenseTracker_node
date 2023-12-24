
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
        <>
        <h1>Set Income</h1><h2>{getuserdata?.data?.income}</h2>
        <form onSubmit={handlesubmit}>
        <input type="number" placeholder="setincome" onChange={handlechange} name="income"  />
        <input type="submit" value="setincome" />
        </form>
        </>
    )
}
export default Income;