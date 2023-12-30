import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const getuserdata = useSelector((state) => state.userReducer.currentUser);

  const router = useNavigate();

  const handleregister = () => {
    router("/register");
    setShowDropdown(false); // Close the dropdown after navigating
  };

  const navigateUpdateuser = () => {
    if (getuserdata && getuserdata.data && getuserdata.data._id) {
      const userId = getuserdata.data._id;
      router(`/updateuser/${userId}`);
    }
    setShowDropdown(false); // Close the dropdown after navigating
  };

  const navigateChangepassword = () => {
    if (getuserdata && getuserdata.data && getuserdata.data._id) {
      const userId = getuserdata.data._id;
      router(`/changepassword/${userId}`);
    }
    setShowDropdown(false); // Close the dropdown after navigating
  };

  const handleclick = () => {
    localStorage.removeItem("token");
    alert("Logout success");
    router("/");
    window.location.reload();
  };

  const gethome = () => {
    router("/");
  };

  return (
    <div className="w-100 h-24 bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <p className="text-lg font-bold mr-4">
          <img
            onClick={gethome}
            src='https://play-lh.googleusercontent.com/dz5ylSXhBNhz5jtcE653shoFInNcdG2iPNxUFiz3vaftjpJBLWUkW9_FaelhTgWd3sE=w600-h300-pc0xffffff-pd'
            alt="Expense Tracker"
            className="mb-4 rounded shadow-lg w-48 h-20 mt-6"
          />
        </p>
        <p className='m-auto font-extrabold -ml-10 text-2xl text-slate-300'> RapidQube-Transforming Business Paradigms</p>
      </div>
      {getuserdata ? (
        <div className="relative group">
          <div className="flex items-center">
            <h1 className="text-xl text-gray-300 font-bold mr-2">{getuserdata?.data?.username}</h1>

            <button
              className="bg-blue-500 text-white py-1 px-3 rounded mr-2 focus:outline-none"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Profile
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md">
                <button
                  onClick={() => {
                    handleclick();
                  }}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Logout
                </button>
                <button
                  onClick={() => {
                    navigateUpdateuser();
                  }}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Update Profile
                </button>
                <button
                  onClick={() => {
                    navigateChangepassword();
                  }}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Change Password
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          {!showDropdown && (
            <button
              className="bg-blue-500 text-white font-semibold py-1 px-3 rounded hover:bg-stone-950"
              onClick={handleregister}
            >
              Signup
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
