import React from 'react'
import SearchFlight from '../components/searchFlights/SearchFlight'
import RelevantFlights from '../components/searchFlights/RelevantFlights'
import MyProfile from '../components/Profile/MyProfile'

const Search = ({searchResults}) => {
    console.log(searchResults)
    const {length} = searchResults
    console.log(length)
    return (
    
    <>  
        {/* <MyProfile/> */}
        <SearchFlight/>
        <RelevantFlights/>
    
    
    </>
  )
}

export default Search