import React from 'react'
import './App.css';
import { Route, Routes } from 'react-router'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>

    </>
  );
}

export default App;