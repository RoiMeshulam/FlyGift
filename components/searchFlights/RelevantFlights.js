import React from 'react'
import { Grid, Box, Typography, Checkbox, Button } from "@mui/material";
import FlightTicket from './FlightTicket';

const RelevantFlights = () => {
  return (
    <Box sx={{background:'#F0E68C', width:'100%',display:'grid', gridTemplateColumns:'50% 50%'}}>
        <Box sx={{height:'200px', display:'flex',alignItems:'center',padding:'1%'}}>
            <FlightTicket/>
        </Box>
        <Box sx={{height:'200px',display:'flex',alignItems:'center',padding:'1%'}}>
            <FlightTicket/>
        </Box>
        <Box sx={{height:'200px',display:'flex',alignItems:'center',padding:'1%'}}>
            <FlightTicket/>
        </Box>
        <Box sx={{height:'200px',display:'flex',alignItems:'center',padding:'1%'}}>
            <FlightTicket/>
        </Box>
        <Box sx={{height:'200px',display:'flex',alignItems:'center',padding:'1%'}}>
            <FlightTicket/>
        </Box>


    </Box>
  )
}

export default RelevantFlights