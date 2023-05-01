import React from 'react'
import SearchFlight from '../components/searchFlights/SearchFlight'

const Home = ({setSearchResults}) => {
  return (
    <SearchFlight setSearchResults={setSearchResults} />
  )
}

export default Home