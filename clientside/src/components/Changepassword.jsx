import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const Changepassword = () => {
    const router = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    console.log(currentUser, "currentUser")
    const [formData, setFormData] = useState({
        id: id,
        password: '',
        newPassword: '',
        confirmNewPassword: '',
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8000/api/changePassword/${id}`, formData);

            if (response.data.success) {
                alert(response.data.message);
                router("/")
                // You might want to redirect or handle success accordingly
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.message);
            }
        }
    };

    return (
        <div style={{backgroundColor:"lightpink", width:"400px", height:"600px",margin:"auto",marginTop:"100px",cursor:"pointer", display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center",borderRadius:"10px"}}>
            <h2 style={{color:"purple"}}>{currentUser?.data?.username}</h2>
            <form style={{display:"flex", flexDirection:"column",justifyContent:"space-between"}} onSubmit={handleSubmit}>

                <label style={{ fontWeight: "bold" }}>Old Password: </label>
                <input style={{width:"330px",height:"40px",borderRadius:"4px",backgroundColor:"lightgrey",border:"none"}} type="password" placeholder='Enter your previous password' name="password" value={formData.password} onChange={handleChange} /><br />

                <label style={{ fontWeight: "bold" }}>New Password: </label>
                <input style={{width:"330px",height:"40px",borderRadius:"4px",backgroundColor:"lightgrey",border:"none"}} type="password" placeholder='Enter your new password' name="newPassword" value={formData.newPassword} onChange={handleChange} /><br />

                <label style={{ fontWeight: "bold" }}>Confirm New Password: </label>
                <input style={{width:"330px",height:"40px",borderRadius:"4px",backgroundColor:"lightgrey",border:"none"}} type="password" placeholder='Confirm your password' name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} /><br />
                <br />
                <input style={{width:"180px",height:"40px",color:"white", margin:"auto", backgroundColor:"purple", borderRadius:"8px",border:"none",fontWeight:"bold",fontSize:"13px"}} type="submit" value="Submit Changed Password" />
            </form>
        </div>
    );
};

export default Changepassword;
