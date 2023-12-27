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

  
    const handleclick = () => {
        localStorage.removeItem("token");
        alert("logout success")
        window.location.reload();
    }
    return (
        <>

            <div>

                <h1>Welcome To </h1>
                <h2>User Management System ...!</h2>

                {getuserdata ? <><div>
                    <h1>{getuserdata?.data?.username}</h1>
                    <div onClick={handleclick}>Logout</div>
                    <button onClick={navigateUpdateuser}>update user profile</button>
                    <button onClick={navigateChangepassword}>Change Password</button>
                </div></> : <>
                    {show ? null : (
                        <div>
                            <button onClick={handlelogin}>login</button>
                        </div>
                    )}
                </>}

            </div>
                       
        </>
    )
};
export default Home;