import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const router = useNavigate();
    const [userInfo, setUserInfo] = useState({ username: '', email: '', password: '', confirmpassword: "", contact: '' });

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/register', userInfo);
            alert(response.data.message);
            router("/login")
            setUserInfo({ username: '', email: '', password: '', confirmpassword: "", contact: '' })
        } catch (error) {
            alert(error.response.data.message)
        }
    };

    return (
        <div style={{backgroundColor:"lightpink", width:"400px", height:"600px",margin:"auto",marginTop:"150px",cursor:"pointer", display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center",borderRadius:"10px"}}>
            <h1 style={{color:"purple"}}>Sign up</h1>
            <form style={{display:"flex", flexDirection:"column",justifyContent:"space-between"}} onSubmit={handleSubmit}>
                <input style={{marginTop:"20px",width:"330px",height:"40px",borderRadius:"4px",backgroundColor:"lightgrey",border:"none"}} type="text" name="username" placeholder='Enter Your Username' value={userInfo.username} onChange={handleChange} required /><br />
                <input style={{marginTop:"20px",width:"330px",height:"40px",borderRadius:"4px",backgroundColor:"lightgrey",border:"none"}} type="email" name="email" placeholder='Enter Your Email' value={userInfo.email} onChange={handleChange} required /><br />
                <input style={{marginTop:"20px",width:"330px",height:"40px",borderRadius:"4px",backgroundColor:"lightgrey",border:"none"}} type="password" name="password" placeholder='Enter Your Password' value={userInfo.password} onChange={handleChange} required /><br />
                <input style={{marginTop:"20px",width:"330px",height:"40px",borderRadius:"4px",backgroundColor:"lightgrey",border:"none"}} type="password" name="confirmpassword" placeholder='Enter Your Confirmpassword' value={userInfo.confirmpassword} onChange={handleChange} required /><br />
                <input style={{marginTop:"20px",width:"330px",height:"40px",borderRadius:"4px",backgroundColor:"lightgrey",border:"none"}} type="text" name="contact" placeholder='Enter Your Contact Number' value={userInfo.contact} onChange={handleChange} required /><br /><br />
                <button style={{width:"100px",height:"40px",color:"white", margin:"auto", backgroundColor:"purple", borderRadius:"8px",border:"none",fontWeight:"bold",fontSize:"18px"}} type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
