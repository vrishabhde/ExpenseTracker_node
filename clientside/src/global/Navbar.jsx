import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [show, setShow] = useState(false);
    const getuserdata = useSelector((state) => state.userReducer.currentUser);

    const router = useNavigate();

    const handlelogin = () => {
        router("/login");
        setShow(true);
    };

    const navigateUpdateuser = () => {
        if (getuserdata && getuserdata.data && getuserdata.data._id) {
            const userId = getuserdata.data._id;
            router(`/updateuser/${userId}`);
        }
    };

    const navigateChangepassword = () => {
        if (getuserdata && getuserdata.data && getuserdata.data._id) {
            const userId = getuserdata.data._id;
            router(`/changepassword/${userId}`);
        }
    };

    const handleclick = () => {
        localStorage.removeItem("token");
        alert("Logout success");
    router("/")
    window.location.reload();
    };

    return (
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div className="flex items-center">
        <p className="text-lg font-bold mr-4">Logo</p>
        <p>Expense Tracker</p>
    </div>
    {getuserdata ? (
        <div className="flex items-center"> {/* Added flex class here */}
            <h1 className="text-xl font-bold mr-2">{getuserdata?.data?.username}</h1>
            <button
                className="bg-red-500 text-white py-1 px-3 rounded mr-2"
                onClick={handleclick}
            >
                Logout
            </button>
            <button
                className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                onClick={navigateUpdateuser}
            >
                Update Profile
            </button>
            <button
                className="bg-green-500 text-white py-1 px-3 rounded"
                onClick={navigateChangepassword}
            >
                Change Password
            </button>
        </div>
    ) : (
        <div>
            {!show && (
                <button
                    className="bg-blue-500 text-white py-1 px-3 rounded"
                    onClick={handlelogin}
                >
                    Login
                </button>
            )}
        </div>
    )}
</div>

    );
};

export default Navbar;
