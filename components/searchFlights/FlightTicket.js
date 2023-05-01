import { React } from "react";
import { Grid, Box, Typography} from "@mui/material";
import FlightDetails from "./FlightDetails";

const FlightTicket = ({flight , oneDirection}) => {
    const {price, route} = flight;
    
  return (
    
    <Grid container sx={{background:'white'}}>
        <Grid item sm={8}>
            {!oneDirection ?
                 <>
                    <Box>
                        <FlightDetails route={route[0]}/>
                    </Box>
                    <Box marginTop={"3%"}>
                        <FlightDetails route={route[1]}/>
                    </Box>
                </>
                :
                <Box>
                    <FlightDetails route={route[0]}/>
                </Box>
            }
            
        </Grid>
        <Grid item sm={4} display={'flex'} justifyContent={'center'}>
            <Box alignSelf={'center'}>
                <Typography variant="h5" >${price}</Typography>
                <button>Select</button>
            </Box>
        </Grid>



    </Grid>
  )
}

export default FlightTicket