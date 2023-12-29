import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const Changepassword = () => {
    const router = useNavigate();
    const { id } = useParams();
    // const dispatch = useDispatch();
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
        <div className="max-w-md mx-auto border border-red-300 mt-20 bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">{currentUser?.data?.username}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
      
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-bold mb-2">Current Password:</label>
            <input
              type="password"
              id="password"
              placeholder='Enter your current password'
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
      
          <div className="flex flex-col">
            <label htmlFor="newPassword" className="text-sm font-bold mb-2">New Password:</label>
            <input
              type="password"
              id="newPassword"
              placeholder='Enter your new password'
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
      
          <div className="flex flex-col">
            <label htmlFor="confirmNewPassword" className="text-sm font-bold mb-2">Confirm New Password:</label>
            <input
              type="password"
              id="confirmNewPassword"
              placeholder='Confirm your password'
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
      
          <input
            type="submit"
            value="Changed Password"
            className="bg-blue-500 hover:bg-blue-950 text-white py-2 px-4 rounded cursor-pointer"
          />
      
        </form>
      </div>
      
    );
};

export default Changepassword;
