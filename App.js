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
import CreditCard from './components/Payment/CreditCard'




function App() {
  const [userInfo, setUserInfo] = React.useState();
  const [userUid, setUserUid] = React.useState();
  const [isConnected,setIsConnected] = React.useState(false)
  const [searchResults,setSearchResults] = React.useState([])
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [oneDirection, setOneDirection] = React.useState(false);
  const [twoDirection, setTwoDirection] = React.useState(true);



  return (
    <Router>
        <Navbar setUserUid={setUserUid} userInfo={userInfo} setUserInfo={setUserInfo} isConnected={isConnected} setIsConnected={setIsConnected}/>
        <Routes>
          <Route path="/" element={<Home oneDirection={oneDirection} twoDirection={twoDirection} setOneDirection={setOneDirection} setTwoDirection={setTwoDirection} setSearchResults={setSearchResults} departure={departure} arrival={arrival} dateFrom={dateFrom} dateTo={dateTo} passengers={passengers} setDeparture={setDeparture} setArrival={setArrival} setDateFrom={setDateFrom} setDateTo={setDateTo} setPassengers={setPassengers} />} />
          <Route path="/MyAccount" element={<MyAccount userInfo={userInfo} />} />
          <Route path="/companyLogin" element={<Company />} />
          <Route path="/GroupPresent" element={<GroupPresent />} />
          <Route path="/Search" element={<Search userUid={userUid} oneDirection={oneDirection} twoDirection={twoDirection} setOneDirection={setOneDirection} setTwoDirection={setTwoDirection} isConnected={isConnected} userInfo={userInfo} setSearchResults={setSearchResults} searchResults={searchResults} departure={departure} arrival={arrival} dateFrom={dateFrom} dateTo={dateTo} passengers={passengers} setDeparture={setDeparture} setArrival={setArrival} setDateFrom={setDateFrom} setDateTo={setDateTo} setPassengers={setPassengers} />} />
        </Routes>
    </Router>
    // <CreditCard/>
    
      
  );
}

export default App;
