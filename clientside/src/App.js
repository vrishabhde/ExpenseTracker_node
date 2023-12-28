import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import { useDispatch } from 'react-redux';
import { currentUser } from './actions/userActions';
import Updateuser from './components/Updateuser';
import Changepassword from './components/Changepassword';
import Budget from './components/Budget';
import Addexpense from './components/Addexpense';
import Income from './components/Income';
import Savings from './components/Savings';
import UpdateExpenses from './components/UpdateExpenses';
import Navbar from './global/Navbar';
import PieChart from './components/PieChart';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser())
  }, [dispatch]);

  // const apiRoutes = ["/api/register", "/api/login", "*"];
  // const renderRoutes = !apiRoutes.includes(location.pathname);
  
  return (
    <>
    <Navbar />
      
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/updateuser/:id' element={<Updateuser />} />
        <Route exact path='/changepassword/:id' element={<Changepassword />} />
        <Route exact path='/budget' element={<Budget />} />
        <Route exact path='/income' element={<Income />} />
        <Route exact path='/saving' element={<Savings />} />
        <Route exact path='/addexpense' element={<Addexpense />} />
        <Route exact path='/updateExpense/:expense_id' element={<UpdateExpenses />} />
        <Route exact path='/chart' element={<PieChart  />} />
      </Routes>
    </>

  );
}

export default App;
