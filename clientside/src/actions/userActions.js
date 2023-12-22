
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



export const setBudget = (budget) => {
  return {
    type: 'SET_BUDGET',
    payload: budget,
  };
};

export const setBudgetSuccess = (budget, userId) => async (dispatch) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/setBudget/${userId}`, { budget });
    dispatch(setBudgetSuccess(response.data.budget));
  } catch (error) {
    console.error(error);
    // Handle error (dispatch an action or show an alert)
  }
};


export const addExpense = (description, amount, userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:8000/api/addexpense', {
        description,
        amount,
        id: userId,
      });

      if (response.data.success) {
        dispatch({
          type: 'ADD_EXPENSE',
          payload: response.data.expense,
        });
      } else {
        // Handle the case where adding the expense was not successful
        console.error(response.data.message);
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
};
