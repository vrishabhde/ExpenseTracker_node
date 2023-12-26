
import axios from 'axios';

export const userLogin = (userdata) => {
  return {
    type: 'Login',
    payload: userdata,
  };
};

export const updateUser = (userData) => {
  return {
    type: 'UPDATE_USER',
    payload: userData,
  };
};



export const userLogout = () => {
  return {
    type: 'Logout',
  };
};

export const currentUser = () => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      if (token) {
        const response = await axios.post('http://localhost:8000/api/getcurrentuser', { token });

        if (response.data) {
          dispatch(userLogin(response.data));
        }
      }
    } catch (error) {
      dispatch(userLogout());
      console.log(error, 'catch error');
      alert(error.response.data.message);
    }
  };
};







