import React, { useContext } from 'react'
import SearchFlight from '../components/searchFlights/SearchFlight'
import RelevantFlights from '../components/searchFlights/RelevantFlights'
import MyProfile from '../components/Profile/MyProfile'
import { UserContext } from '../UserContext'

const Search = () => {
  const {dateFrom,dateTo, isConnected} = useContext(UserContext);
    
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
        <MyProfile/>
        :
        <></>
      }
        <SearchFlight />
        <RelevantFlights />
    </>
  )
}

export default Search