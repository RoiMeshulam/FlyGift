import React, { useContext,useState, useEffect } from 'react'
import { Box, Typography, CircularProgress} from "@mui/material";
import FlightTicket from './FlightTicket';
import { UserContext } from '../../UserContext';

const RelevantFlights = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {searchResults} = useContext(UserContext);
    let index = -1;

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false); // Update isLoading to false after 2000 milliseconds (2 seconds)
        }, 2000);
    
        return () => clearTimeout(timer); // Clear the timer when the component unmounts or rerenders
      }, []);

  return (
    <>
    {isLoading ? (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <CircularProgress />
      </Box>
    ) : (
      <>
        {searchResults.length === 0 ? (
          <Box>
            <Typography variant="h3" textAlign="center" marginTop="10%">
              לא נמצאו טיסות
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              background: '#F0E68C',
              width: '100%',
              display: 'grid',
              gridTemplateColumns: '50% 50%',
              marginTop: '1%'
            }}
          >
            {searchResults.map((flight) => (
              (index = index + 1),
              console.log(flight),
              <Box
                sx={{ height: '200px', display: 'flex', alignItems: 'center', padding: '1%' }}
                key={index}
              >
                <FlightTicket flight={flight} />
              </Box>
            ))}
          </Box>
        )}
      </>
    )}
  </>
  )
}

export default RelevantFlights