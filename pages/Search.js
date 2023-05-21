import React, { useContext } from 'react'
import SearchFlight from '../components/searchFlights/SearchFlight'
import RelevantFlights from '../components/searchFlights/RelevantFlights'
import MyProfile from '../components/Profile/MyProfile'
import { UserContext } from '../UserContext'

const Search = () => {
  const {isConnected} = useContext(UserContext);
      
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