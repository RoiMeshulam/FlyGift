import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import MyAccount from './pages/MyAccount';
import GroupPresent from './pages/GroupPresent';
import Search from './pages/Search';
import { UserContext } from './UserContext';

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
  const [currCash,setCurrCash] = useState(0);
  const [dateFromShow, setDateFromShow] = useState("");
  const [dateToShow, setDateToShow] = useState("");



  return (
    
    <Router>
        <UserContext.Provider value={{userInfo, setUserInfo, userUid,setUserUid,isConnected,setIsConnected,searchResults,setSearchResults,departure,setDeparture,arrival,setArrival,dateFrom,setDateFrom,dateTo,setDateTo,passengers,setPassengers,oneDirection,setOneDirection,currCash,setCurrCash,dateFromShow, setDateFromShow,dateToShow, setDateToShow}}>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/MyAccount" element={<MyAccount/>} />
            <Route path="/GroupPresent" element={<GroupPresent/>} />
            <Route path="/Search" element={<Search/>} />
          </Routes>
        </UserContext.Provider>
    </Router>
   
    
      
  );
}

export default App;
