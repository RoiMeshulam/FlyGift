import { React, useState } from "react";
import { Grid, Box, Typography, Checkbox, Button } from "@mui/material";
import { styled } from "@mui/system";
import airplane from '../../img/airplane.png'
import './FlightDetails.css'

const FlightDetails = () => {
  return (
    <Grid container alignSelf={"center"}>
      <Grid item sm={3} display={'flex'} justifyContent={'center'}>
        <Typography variant="h5" alignSelf={'center'}>ELAL</Typography>
      </Grid>
      <Grid item sm={9}>
        <Grid container>
          <Grid item sm={4} textAlign={'right'}>
            <Box marginRight={"3%"}>
              <Typography variant="h6">11:40 PM</Typography>
              <Typography variant="h6">TLV</Typography>
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Box textAlign={'center'}>
              <Typography variant="h6">10h 35m</Typography>
              <Box display={'flex'}>
                <hr className="line" width={'80%'}/>
                <img src={airplane} alt="airplane" width={'10%'} height={'30px'} display={'inline-block'}/>
              </Box>
              
              
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Box marginLeft={"3%"}>
              <Typography variant="h6">8:15 AM</Typography>
              <Typography variant="h6">STN</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FlightDetails;
