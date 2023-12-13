import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import { useDispatch } from 'react-redux';
import { currentUser } from './actions/userActions';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser())
  }, [dispatch]);

  return (

    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/register' element={<Register />} />
      <Route exact path='/login' element={<Login />} />
    </Routes>

  );
}

export default App;
