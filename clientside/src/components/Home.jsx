import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    const [show, setshow] = useState(false);
    const getuserdata = useSelector((state) => state.userReducer.currentUser);
    console.log(getuserdata, "getuserdatagdkv");

    const router = useNavigate();
    const handlelogin = () => {
        router("/login");
        setshow(true);
    };

    const navigateUpdateuser = () => {
        if (getuserdata && getuserdata.data && getuserdata.data._id) {
            const userId = getuserdata.data._id;
            router(`/updateuser/${userId}`);
          }
        
      };
    const navigateChangepassword = () => {
        if (getuserdata && getuserdata.data && getuserdata.data._id) {
            const userId = getuserdata.data._id;
            router(`/changepassword/${userId}`);
          }
        
      };

    const bgImage = {
        width: "100%",
        height: "880px",
        backgroundImage: `url("https://th.bing.com/th/id/R.fab946a03bb6c8a063cf4408764f4e5d?rik=dpKHUfGNVbSn0w&riu=http%3a%2f%2fhofficecrm.com%2fwp-content%2fuploads%2f2020%2f01%2fUser_Management-740x740.png&ehk=2LVkP0vru0wYdFXXHiMQiS0GWnetyRc%2buT0rEpLP1EU%3d&risl=&pid=ImgRaw&r=0")`,
        backgroundSize: 'cover',
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        cursor: "pointer"
    };
    const handleclick = () => {
        localStorage.removeItem("token");
        alert("logout success")
        window.location.reload();
    }
    return (
        <>

            <div style={bgImage}>

                <h1>Welcome To </h1>
                <h2>User Management System ...!</h2>

                {getuserdata ? <><div>
                    <h1 style={{ color: "green" }}>{getuserdata?.data?.username}</h1>
                    <div style={{width:"150px",height:"40px",color:"white", margin:"auto", backgroundColor:"purple", borderRadius:"8px",border:"none",fontWeight:"bold",fontSize:"18px"}} onClick={handleclick}>Logout</div>
                    <button style={{marginTop:"30px", width:"150px",height:"40px",color:"white", margin:"auto", backgroundColor:"purple", borderRadius:"8px",border:"none",fontWeight:"bold",fontSize:"18px"}} onClick={navigateUpdateuser}>update user profile</button>
                    <button style={{marginTop:"30px", width:"150px",height:"40px",color:"white", margin:"auto", backgroundColor:"purple", borderRadius:"8px",border:"none",fontWeight:"bold",fontSize:"18px"}} onClick={navigateChangepassword}>Change Password</button>
                </div></> : <>
                    {show ? null : (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <button style={{ width: "80px", height: "35px", border: "1px solid grey", borderRadius: "3px", backgroundColor: "green", color: "white", fontSize: "18px", fontWeight: "bold" }} onClick={handlelogin}>login</button>
                        </div>
                    )}
                </>}

            </div>
                       
        </>
    )
};
export default Home;