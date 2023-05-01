import { React} from "react";
import { Grid, Box, Typography} from "@mui/material";
import airplane from '../../img/airplane.png'
import './FlightDetails.css'

const FlightDetails = ({route}) => {
  const {airline, flyFrom , flyTo , local_arrival, local_departure} = route

  function formatTime(dateStr) {
    // Split the input date string into day, month, and year components
    const date = dateStr.split(":");
    const temp = date[0].split("T");
    const hour = temp[1];
    const mintues = date[1]
    const time = hour + ":" + mintues;
    const parseHour = parseInt(hour); 
    if(parseHour >=0 && parseHour <= 11){
      return time+" AM"
    }
    else{
      return time+" PM"
    }
  }

  function getDuration() {
    // Parse the start and end times into Date objects
    const startTime = new Date(local_departure);
    const endTime = new Date(local_arrival);
  
    // Calculate the time difference in milliseconds
    const diffMs = endTime - startTime;
  
    // Convert the time difference to hours and minutes
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
    // Format the duration string as hh:mm
    const duration = `${diffHours.toString().padStart(2, '0')}h ${diffMinutes.toString().padStart(2, '0')}m`;
  
    return duration;
  }
  return (
    <Grid container alignSelf={"center"}>
      <Grid item sm={3} display={'flex'} justifyContent={'center'}>
        <Typography variant="h5" alignSelf={'center'}>{airline}</Typography>
      </Grid>
      <Grid item sm={9}>
        <Grid container>
          <Grid item sm={4} textAlign={'right'}>
            <Box marginRight={"3%"}>
              <Typography variant="h6">{formatTime(local_departure)}</Typography>
              <Typography variant="h6">{flyFrom}</Typography>
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Box textAlign={'center'}>
              <Typography variant="h6">{getDuration()}</Typography>
              <Box display={'flex'}>
                <hr className="line" width={'80%'}/>
                <img src={airplane} alt="airplane" width={'10%'} height={'30px'} display={'inline-block'}/>
              </Box>
              
              
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Box marginLeft={"3%"}>
              <Typography variant="h6">{formatTime(local_arrival)}</Typography>
              <Typography variant="h6">{flyTo}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FlightDetails;
