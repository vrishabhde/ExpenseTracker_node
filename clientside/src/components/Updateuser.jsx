// Updateuser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../actions/userActions';
import { useNavigate, useParams } from 'react-router-dom';


const Updateuser = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    const { id } = useParams();
    const route = useNavigate();
    const [data, setData] = useState({
        email: '',
        contact: '',
        username: '',
        password: '',
    });

    useEffect(() => {
        if (currentUser && currentUser.data) {
            setData({
                email: currentUser.data.email || '',
                contact: currentUser.data.contact || '',
                username: currentUser.data.username || '',
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8000/api/updateuser/${id}`, {
                email: data?.email,
                username: data?.username,
                contact: data?.contact
            });
            console.log(response, "response")
            if (response.data.success) {
                dispatch(updateUser(data));
                alert(response.data.message);
                route("/");
                window.location.reload();
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.message);
            }
        }
    };

    return (
        <>
        <div style={{backgroundColor:"lightpink", width:"400px", height:"600px",margin:"auto",marginTop:"100px",cursor:"pointer", display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center",borderRadius:"10px"}}>
        <h1 style={{color:"purple"}}>Update User Profile</h1>
        <form style={{display:"flex", flexDirection:"column",justifyContent:"space-between"}} onSubmit={handleSubmit}>
                <label>Email: </label>
                <input style={{marginTop:"20px",width:"330px",height:"40px",borderRadius:"4px",backgroundColor:"lightgrey",border:"none"}} type="email" onChange={handleChange} name="email" value={data.email} /><br />

                <label>Contact: </label>
                <input style={{marginTop:"20px",width:"330px",height:"40px",borderRadius:"4px",backgroundColor:"lightgrey",border:"none"}} type="text" onChange={handleChange} name="contact" value={data.contact} /><br />

                <label>Username: </label>
                <input style={{marginTop:"20px",width:"330px",height:"40px",borderRadius:"4px",backgroundColor:"lightgrey",border:"none"}} type="text" onChange={handleChange} name="username" value={data.username} /><br />

                <input style={{width:"100px",height:"40px",color:"white", margin:"auto", backgroundColor:"purple", borderRadius:"8px",border:"none",fontWeight:"bold",fontSize:"18px"}} type="submit" value="Submit" />
            </form>
            </div>
        </>
    );
};

export default Updateuser;
