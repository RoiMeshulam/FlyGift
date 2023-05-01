import { React, useState } from 'react'
import { Grid, Box, Typography, Checkbox , Button} from '@mui/material';
import { styled } from '@mui/system'
import { grey } from '@mui/material/colors';
import SelectFlights from './SelectFlights';
import DatePickerFlight from './DatePickerFlight';
import Groups2Icon from '@mui/icons-material/Groups2';
import { searchFlightsOneDirection, searchFlightsTwoDirection } from './TequilaAPI'
import { Link } from "react-router-dom";

const GridRtl = styled(Grid)({
    direction:'rtl'
  });
const GroupIcon = styled(Groups2Icon)({
    color: grey[500]
});
const GreyButton = styled(Button)({
    background: grey[500]
});

const SearchFlight = ({oneDirection, twoDirection, setOneDirection, setTwoDirection, setSearchResults, departure, arrival, dateFrom, dateTo, passengers, setDeparture, setArrival, setDateFrom, setDateTo, setPassengers}) => {
   
    const handleNumTicketsChange = (event) => {
        setPassengers(parseInt(event.target.value));
    };

    const handleOneDirectionChange = (event) => {
        setOneDirection(true);
        setTwoDirection(false);
    };

    const handleTwoDirectionChange = (event) => {
        setOneDirection(false);
        setTwoDirection(true);
    };

    const handleSearchButton = async (event) => {
        if(oneDirection){
            const flight = await searchFlightsOneDirection(departure, arrival, dateFrom, dateTo, passengers);
            const {data} = flight
            setSearchResults(data)   
        }
        else{
            const flight = await searchFlightsTwoDirection(departure, arrival, dateFrom, dateTo, passengers);
            const {data} = flight
            setSearchResults(data)
        }
    }

  return (
    <Box sx={{height:300 , bgcolor:'#F0E68C' ,border:1  }}>
        <GridRtl container flexDirection={'column'}>
            <Grid item>
                <Typography variant='h4' fontWeight={'700'} color={grey[100]} marginRight={'10px'} > מציאת טיסה</Typography>
            </Grid>
            <Grid item>
             <GridRtl container>
                <Grid item >
                    <Box display={'flex'} alignItems={'center'}>
                        <Checkbox sx={{
                            color: grey[400],
                            '&.Mui-checked': {
                            color: grey[400],
                        },}}
                        checked={oneDirection}
                        onChange={handleOneDirectionChange}
                        />
                        <Typography variant='h6' fontWeight={'700'} color={grey[100]} > כיוון אחד</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Box display={'flex'} alignItems={'center'}>
                    <Checkbox sx={{
                            color: grey[400],
                            '&.Mui-checked': {
                            color: grey[400],
                        },}}
                        checked={twoDirection}
                        onChange={handleTwoDirectionChange}
                         />
                        <Typography variant='h6' fontWeight={'700'} color={grey[100]} > הלוך ושוב</Typography>
                    </Box>
                </Grid>
             </GridRtl>
            </Grid>
            <Grid item>
                <GridRtl container height={100} >
                    <Grid item lg={6}>
                        <SelectFlights setDeparture={setDeparture} setArrival={setArrival} departure={departure} arrival={arrival}/>
                    </Grid>
                    <Grid item lg={4}>
                        <DatePickerFlight setDateTo={setDateTo} dateTo={dateTo} setDateFrom={setDateFrom} dateFrom={dateFrom}/>
                    </Grid>
                    <Grid item lg={2} >
                        <GridRtl container height={100} >
                            <Grid item lg={10}>
                                <Box height={100}>
                                    <Typography variant='h6' fontWeight={'700'} color={grey[100]} > מספר נוסעים</Typography>
                                    <input type="number" id="passengers" name="passengers" min={1} value={passengers} onChange={handleNumTicketsChange} style={{
                                        height:'50%',
                                        width:'85%',
                                        textAlign:'center',
                                        fontSize:'19px',
                                        borderRadius:'8px'     
                                    }}  />
                                </Box>
                            </Grid>
                            <Grid item lg={1} display={'flex'}>
                                <Box  marginTop={'40%'} marginRight={'-50%'} alignSelf={'center'}>
                                    <GroupIcon fontSize='large'/>
                                </Box>
                            </Grid>
                        </GridRtl>
                    </Grid>
                </GridRtl>
            </Grid>
            <Grid item height={100} display={'flex'} justifyContent={'left'} marginLeft={'1%'}>
                <Box alignSelf={'center'}>
                    <Link to="/Search">               
                        <GreyButton size={'Large'} variant="contained" onClick={handleSearchButton}>חפש</GreyButton>                      
                    </Link>
                </Box>
            </Grid>
        </GridRtl>
    </Box>

  )
}

export default SearchFlight