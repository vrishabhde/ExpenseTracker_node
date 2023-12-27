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
        <div className="flex items-center justify-center h-screen bg-blue-500">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center">
                <h1 className="text-4xl font-bold mb-4 text-blue-500">Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            placeholder="Enter Your Email"
                            name="email"
                            value={userdata.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            placeholder="Enter Your Password"
                            name="password"
                            value={userdata.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Login
                    </button>
                    <p className="mt-4 text-sm text-blue-500">
                        Don't Have an Account? <span onClick={handleclick} className="text-red-500 font-bold cursor-pointer">Sign Up</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
