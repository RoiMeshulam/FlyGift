import './App.css';
import React, { useState } from 'react';
import {Box} from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import MyAccount from './pages/MyAccount';
import Company from './pages/Company';
import GroupPresent from './pages/GroupPresent';
import Search from './pages/Search';




function App() {
  const [userInfo, setUserInfo] = React.useState();
  const [isConnected,setIsConnected] = React.useState(false)
  const [searchResults,setSearchResults] = React.useState([])



  return (
    <Router>
        <Navbar userInfo={userInfo} setUserInfo={setUserInfo} isConnected={isConnected} setIsConnected={setIsConnected}/>
        <Routes>
          <Route path="/" element={<Home setSearchResults={setSearchResults} />} />
          <Route path="/MyAccount" element={<MyAccount userInfo={userInfo} />} />
          <Route path="/companyLogin" element={<Company />} />
          <Route path="/GroupPresent" element={<GroupPresent />} />
          <Route path="/Search" element={<Search isConnected={isConnected} userInfo={userInfo} searchResults={searchResults} />} />
        </Routes>
    </Router>
      
  );
}

export default App;
