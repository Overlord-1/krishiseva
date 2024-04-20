import React from 'react'
// import './App.css';
import { Route, Routes } from 'react-router'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PostPage from './pages/PostPage';
import Crop from './pages/Crop';
import Leaf from './pages/Leaf';
import Community from './pages/Community';


function App() {
  return (
    <>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/crop' element={<Crop />} />
            <Route path='/leaf' element={<Leaf />} />
            <Route path='/community' element={<Community />} />
            <Route path="/posts/:postID" element={<PostPage />} />
        </Routes>

    </>
  );
}

export default App;