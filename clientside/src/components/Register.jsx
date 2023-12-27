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
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-lg border border-gray-300">
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-bold mb-2">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder='Enter Your Username'
              value={userInfo.username}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
      
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Enter Your Email'
              value={userInfo.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
      
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Enter Your Password'
              value={userInfo.password}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
      
          <div className="mb-4">
            <label htmlFor="confirmpassword" className="block text-sm font-bold mb-2">Confirm Password:</label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              placeholder='Enter Your Confirm Password'
              value={userInfo.confirmpassword}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
      
          <div className="mb-4">
            <label htmlFor="contact" className="block text-sm font-bold mb-2">Contact Number:</label>
            <input
              type="text"
              id="contact"
              name="contact"
              placeholder='Enter Your Contact Number'
              value={userInfo.contact}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
      
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
      

    );
};

export default Register;
