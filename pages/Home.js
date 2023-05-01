import React from 'react'
import SearchFlight from '../components/searchFlights/SearchFlight'

const Home = ({oneDirection, twoDirection, setOneDirection, setTwoDirection, setSearchResults, departure, arrival, dateFrom, dateTo, passengers, setDeparture, setArrival, setDateFrom, setDateTo, setPassengers}) => {
  return (
    <SearchFlight oneDirection={oneDirection} twoDirection={twoDirection} setOneDirection={setOneDirection} setTwoDirection={setTwoDirection} setSearchResults={setSearchResults} departure={departure} arrival={arrival} dateFrom={dateFrom} dateTo={dateTo} passengers={passengers} setDeparture={setDeparture} setArrival={setArrival} setDateFrom={setDateFrom} setDateTo={setDateTo} setPassengers={setPassengers} />
  )
}

export default Home