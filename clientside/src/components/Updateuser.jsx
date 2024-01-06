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
        firstname: '',
        lastname: '',
    });

    useEffect(() => {
        if (currentUser && currentUser.data) {
            setData({
                email: currentUser.data.email || '',
                contact: currentUser.data.contact || '',
                firstname: currentUser.data.firstname || '',
                lastname: currentUser.data.lastname || '',
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
                firstname: data?.firstname,
                lastname: data?.lastname,
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
      <div className="mt-10 flex items-center justify-center h-screen">
  <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md border border-gray-300 hover:shadow-lg hover:border-blue-500 transition duration-300 ease-in-out">
    <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
    <form onSubmit={handleSubmit} className="space-y-4">

      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-bold">Email:</label>
        <input
          type="email"
          id="email"
          onChange={handleChange}
          name="email"
          value={data.email}
          className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="contact" className="text-sm font-bold">Contact:</label>
        <input
          type="text"
          id="contact"
          onChange={handleChange}
          name="contact"
          value={data.contact}
          className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="firstname" className="text-sm font-bold">First Name:</label>
        <input
          type="text"
          id="firstname"
          onChange={handleChange}
          name="firstname"
          value={data.firstname}
          className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="lastname" className="text-sm font-bold">Last Name:</label>
        <input
          type="text"
          id="lastname"
          onChange={handleChange}
          name="lastname"
          value={data.lastname}
          className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <input
        type="submit"
        value="Submit"
        className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out"
      />

    </form>
  </div>
</div>


        </>
    );
};

export default Updateuser;
