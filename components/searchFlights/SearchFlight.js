import { React, useContext} from 'react'
import { Grid, Box, Typography, Checkbox , Button} from '@mui/material';
import { styled } from '@mui/system'
import { grey } from '@mui/material/colors';
import SelectFlights from './SelectFlights';
import DatePickerFlight from './DatePickerFlight';
import Groups2Icon from '@mui/icons-material/Groups2';
import { searchFlightsOneDirection, searchFlightsTwoDirection } from './TequilaAPI'
import { Link } from "react-router-dom";
import { UserContext } from '../../UserContext';

const GridRtl = styled(Grid)({
    direction:'rtl'
  });
const GroupIcon = styled(Groups2Icon)({
    color: grey[500]
});
const GreyButton = styled(Button)({
    background: grey[500]
});

const SearchFlight = () => {
    const {oneDirection, setOneDirection , setSearchResults, departure, arrival, dateFrom, dateTo, passengers, setPassengers, searchResults} = useContext(UserContext);
   
   
    const handleNumTicketsChange = (event) => {
        setPassengers(parseInt(event.target.value));
    };

    const handleOneDirectionChange = async (event) => {
        setOneDirection(!oneDirection); 
    };

    const daysInYear = (year,month) =>{
        const maxDaysByMonth = {
            1: 31, // January
            2: (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28, // February (considering leap years)
            3: 31, // March
            4: 30, // April
            5: 31, // May
            6: 30, // June
            7: 31, // July
            8: 31, // August
            9: 30, // September
            10: 31, // October
            11: 30, // November
            12: 31, // December
          };

          return maxDaysByMonth[month];

    }

    const areValidDates = (from, to) => {
        const [dayFrom, monthFrom, yearFrom] = from.split('/').map(Number);
        const [dayTo, monthTo, yearTo] = to.split('/').map(Number);
       
        // check if the day and the month are lligel 
        if (dayFrom > daysInYear(yearFrom,monthFrom) || dayTo > daysInYear(yearTo,monthTo)) {
            return false;
        }

        // Create a Date object for the given date
        const givenDateFrom = new Date(yearFrom, monthFrom - 1, dayFrom); // month - 1 because month in JavaScript Date is zero-based

        // Create a Date object for the given date
        const givenDateTo = new Date(yearTo, monthTo - 1, dayTo); // month - 1 because month in JavaScript Date is zero-based

        // Get the current date
        const currentDate = new Date();

        // Compare the given date with the current date
        if (givenDateFrom < currentDate || givenDateTo < currentDate) {
            // Given date is in the past
            return false;
        }

        if(yearFrom <= yearTo){
            if(yearFrom == yearTo){
                if(monthFrom <= monthTo){
                    if(monthFrom== monthTo){
                        if(dayFrom < dayTo){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }else{
                        return true;
                    }
                }else{
                    return false;
                }
            }else{
                return true;
            }

        }else{
            return false;
        }



    }
  

    const handleSearchButton = async (event) => {
        let isValid = areValidDates(dateFrom,dateTo);
        if(isValid){
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
        }else{
            alert("אנא ודא/י שמילאת את כל השדות בצורה נכונה");
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
                        checked={!oneDirection}
                        onChange={handleOneDirectionChange}
                         />
                        <Typography variant='h6' fontWeight={'700'} color={grey[100]} > הלוך ושוב</Typography>
                    </Box>
                </Grid>
             </GridRtl>
            </Grid>
            <Grid item>
                <GridRtl container height={100} >
                    <Grid item lg={6}>
                        <SelectFlights/>
                    </Grid>
                    <Grid item lg={4}>
                        <DatePickerFlight/>
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