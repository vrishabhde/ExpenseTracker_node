import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const router = useNavigate();
  const [userInfo, setUserInfo] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    country: { code: '', name: '' },
    contact: '',
  });

  const handleChange = (e) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [e.target.name]: e.target.name === 'country'
        ? { code: e.target.value.split('|')[0], name: e.target.value.split('|')[1] }
        : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/register', userInfo);
      alert(response.data.message);
      router("/login");
      setUserInfo({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
        country: { code: '', name: '' },
        contact: '',
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="mt-32 w-100 h-[100%] max-w-md mx-auto bg-white p-6 rounded-md shadow-lg border border-gray-300">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstname" className="block text-sm font-bold mb-2">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder='Enter Your First Name'
            value={userInfo.firstname}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastname" className="block text-sm font-bold mb-2">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder='Enter Your Last Name'
            value={userInfo.lastname}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

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
          <label htmlFor="country" className="block text-sm font-bold mb-2">Country Code:</label>
          <select
            id="country"
            name="country"
            value={`${userInfo.country.code}|${userInfo.country.name}`}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Country</option>
            <option value="+91|India">+91 - India</option>
            <option value="+92|Pakistan">+92 - Pakistan</option>
            {/* Add more country codes and names as needed */}
          </select>
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
