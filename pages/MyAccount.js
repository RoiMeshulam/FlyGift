import React from 'react'
import MyProfile from '../components/Profile/MyProfile'
import SearchFlight from '../components/searchFlights/SearchFlight'

const MyAccount = ({userInfo}) => {
  

  return (
    <>
        <MyProfile userInfo={userInfo} />
        <SearchFlight/>
    </>
  )
}

export default MyAccount