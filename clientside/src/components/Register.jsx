import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [userInfo, setUserInfo] = useState({ username: '', email: '', password: '', confirmpassword: "", contact: '' });

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/register', userInfo);
            alert(response.data.message);
            setUserInfo({ username: '', email: '', password: '', confirmpassword: "", contact: '' })
        } catch (error) {
            alert(error.response.data.message)
        }
    };

    return (
        <div>
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder='Enter Your Username' value={userInfo.username} onChange={handleChange} required /><br />
                <input type="email" name="email" placeholder='Enter Your Email' value={userInfo.email} onChange={handleChange} required /><br />
                <input type="password" name="password" placeholder='Enter Your Password' value={userInfo.password} onChange={handleChange} required /><br />
                <input type="password" name="confirmpassword" placeholder='Enter Your Confirmpassword' value={userInfo.confirmpassword} onChange={handleChange} required /><br />
                <input type="text" name="contact" placeholder='Enter Your Contact Number' value={userInfo.contact} onChange={handleChange} required /><br /><br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
