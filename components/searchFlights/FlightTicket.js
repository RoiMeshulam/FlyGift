import { React, useState } from "react";
import { Grid, Box, Typography, Checkbox, Button } from "@mui/material";
import { styled } from "@mui/system";
import FlightDetails from "./FlightDetails";

const FlightTicket = () => {
  return (
    <Grid container sx={{background:'white'}}>
        <Grid item sm={8}>
            <Box>
                <FlightDetails/>
            </Box>
            <Box marginTop={"3%"}>
                <FlightDetails/>
            </Box>
        </Grid>
        <Grid item sm={4} display={'flex'} justifyContent={'center'}>
            <Box alignSelf={'center'}>
                <Typography variant="h5" >$326</Typography>
                <button>Select</button>
            </Box>
        </Grid>



    </Grid>
  )
}

export default FlightTicket