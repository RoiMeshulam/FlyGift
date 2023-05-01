import React from 'react'
import { Box, Typography} from "@mui/material";
import FlightTicket from './FlightTicket';

const RelevantFlights = ({searchResults , oneDirection}) => {
    const {length} = searchResults
    let index = -1;

  return (
    <>
    {length===0 ?
        <Box>
            <Typography variant='h3'>לא נמצאו טיסות</Typography>
        </Box>
        :
         <Box sx={{background:'#F0E68C', width:'100%',display:'grid', gridTemplateColumns:'50% 50%', marginTop:'1%'}}>
            {
                searchResults.map((flight) => (
                    index=index+1,
                    console.log(flight),
                    <Box sx={{height:'200px', display:'flex',alignItems:'center',padding:'1%'}}>
                        <FlightTicket key={index} flight= {flight} oneDirection={oneDirection}/>
                    </Box>    
                ))
            }
        </Box>    
    }
    </>
  )
}

export default RelevantFlights