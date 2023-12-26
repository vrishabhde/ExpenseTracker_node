
import { useSelector } from "react-redux";

const Savings = () => {
    const getuserdata = useSelector((state) => state.userReducer.currentUser);
    console.log(getuserdata,"getuserdatata")
  
    
    return (
        <>
       
        <p>Savings: {getuserdata?.data?.savings}</p>

        </>
    )
}
export default Savings;