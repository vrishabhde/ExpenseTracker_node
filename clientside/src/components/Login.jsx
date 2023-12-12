import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
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
                localStorage.setItem('token', response.data.token);

            }

        } catch (error) {
            console.error(error.response.data.message)
            alert(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Enter Your Email' name="email" value={userdata.email} onChange={handleChange} required /> <br />
                <input type="password" placeholder='Enter Your Password' name="password" value={userdata.password} onChange={handleChange} required /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
