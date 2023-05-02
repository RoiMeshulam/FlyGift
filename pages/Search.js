import React from 'react'
import SearchFlight from '../components/searchFlights/SearchFlight'
import RelevantFlights from '../components/searchFlights/RelevantFlights'
import MyProfile from '../components/Profile/MyProfile'

const Search = ({userUid, oneDirection, twoDirection, setOneDirection, setTwoDirection, isConnected ,userInfo, setSearchResults, searchResults, departure, arrival, dateFrom, dateTo, passengers, setDeparture, setArrival, setDateFrom, setDateTo, setPassengers}) => {
    
    function formatDate(dateStr) {
      // Split the input date string into day, month, and year components
      const [day, month, year] = dateStr.split("/");
      // Use string concatenation to format the date in the desired output format
      const formattedDate = `${year}-${month}-${day}`;
      // Return the formatted date string
      return formattedDate;
    }
    // change the format in order to show it in datePicker (the previous format matched to TaquilaAPI)
    const from = formatDate(dateFrom)
    const to = formatDate(dateTo)    
    return (
    <>  
      {isConnected ? 
        <MyProfile userInfo={userInfo}/>
        :
        <></>
      }
        <SearchFlight oneDirection={oneDirection} twoDirection={twoDirection} setOneDirection={setOneDirection} setTwoDirection={setTwoDirection} setSearchResults={setSearchResults} departure={departure} arrival={arrival} dateFrom={from} dateTo={to} passengers={passengers} setDeparture={setDeparture} setArrival={setArrival} setDateFrom={setDateFrom} setDateTo={setDateTo} setPassengers={setPassengers}/>
        <RelevantFlights userUid={userUid} searchResults={searchResults} oneDirection={oneDirection} twoDirection={twoDirection} isConnected={isConnected} userInfo={userInfo}/>
    </>
  )
}

export default Search