import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { currentUser, userLogin } from '../actions/userActions';

const Login = () => {
    const dispatch = useDispatch();
    const router = useNavigate();
    const [userdata, setUserdata] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setUserdata({ ...userdata, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', userdata);
            if (response) {
                alert(response.data.message)
                localStorage.setItem('token',JSON.stringify(response.data.token));
                console.log(response.data.token,"response.data.token")
                dispatch(userLogin(response.data.userdata));
                dispatch(currentUser());
                router("/")
            }
        } catch (error) {
            console.error(error.response.data.message)
            alert(error.response.data.message);
        }
    };

    const handleclick = () => {
        router("/register")
    }
    return (
        <div style={{backgroundColor:"lightpink", width:"350px", height:"450px",margin:"auto",marginTop:"200px",cursor:"pointer", display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center",borderRadius:"10px"}}>
            <h1 style={{color:"purple"}}>Sign In</h1>
            <form style={{display:"flex", flexDirection:"column",justifyContent:"space-between"}} onSubmit={handleSubmit}>
                <input style={{marginTop:"20px",width:"300px",height:"40px",borderRadius:"4px",backgroundColor:"lightgrey",border:"none"}} type="email" placeholder='Enter Your Email' name="email" value={userdata.email} onChange={handleChange} required /> <br />
                <input style={{width:"300px",height:"40px",borderRadius:"4px",backgroundColor:"lightgrey",border:"none"}} type="password" placeholder='Enter Your Password' name="password" value={userdata.password} onChange={handleChange} required /><br />
                <button style={{width:"100px",height:"40px",color:"white", margin:"auto", backgroundColor:"purple", borderRadius:"8px",border:"none",fontWeight:"bold",fontSize:"18px",marginTop:"30px"}} type="submit">Login</button>
                <p style={{marginLeft:"40px"}}>Don't Have an Account <span onClick={handleclick} style={{color:"red",fontWeight:"bold"}}>Sign Up</span></p>
            </form>
        </div>
    );
};

export default Login;
