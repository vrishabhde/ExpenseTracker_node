
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (

   <>
   <Routes>
    <Route exact path='/register' element={<Register />} />
    <Route exact path='/login' element={<Login />} />
   </Routes>
   </>
  );
}

export default App;
