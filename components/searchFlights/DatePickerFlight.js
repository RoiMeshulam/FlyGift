import { Grid , Box , Typography } from '@mui/material';
import { React, useState } from 'react'
import { styled } from '@mui/system'
import { grey } from '@mui/material/colors';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const GridRtl = styled(Grid)({
  direction:'rtl'
});

const CalanderIcon = styled(CalendarMonthIcon)({
  color: grey[500]
});

const DatePickerFlight = ({dateFrom, setDateFrom, dateTo, setDateTo}) => {
  const [dateFromShow, setDateFromShow] = useState(dateFrom);
  const [dateToShow, setDateToShow] = useState(dateTo);

  const handleDateChangeFrom = (event) => {
    console.log(event.target.value)
    setDateFromShow(event.target.value)
    setDateFrom(formatDate(event.target.value));
  };
  const handleDateChangeTo = (event) => {
    setDateToShow(event.target.value)
    setDateTo(formatDate(event.target.value));
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
};

  const today = new Date().toISOString().substr(0, 10);

  return (
    <GridRtl container height={100}>
      <Grid item lg={6} display={'flex'}>
        <Box width={'90%'} marginRight={'5%'}>
          <Typography variant='h6' fontWeight={'700'} color={grey[100]} > יציאה</Typography>
          <input type="date" id="date" name="date" min={today} value={dateFromShow} onChange={handleDateChangeFrom} style={{
            width: '100%',
            height: '55%',
            borderRadius:'5px',
            fontSize: '19px',
            textAlign:'center'
          }}/>
        </Box>
        <Box width={'10%'} alignSelf={'center'} marginTop={'5%'} marginRight={'2%'} marginLeft={'2%'}>
          <CalanderIcon fontSize='large'/>
        </Box>
      </Grid>
      <Grid item lg={6} display={'flex'}>
      <Box width={'90%'} marginRight={'5%'}>
          <Typography variant='h6' fontWeight={'700'} color={grey[100]} > חזרה</Typography>
          <input type="date" id="date" name="date" min={today} value={dateToShow} onChange={handleDateChangeTo} style={{
            width: '100%',
            height: '55%',
            borderRadius:'5px',
            fontSize: '19px',
            textAlign:'center'
          }}/>
        </Box>
        <Box width={'10%'} alignSelf={'center'} marginTop={'5%'} marginRight={'2%'} marginLeft={'10%'} >
          <CalanderIcon fontSize='large'/>
        </Box>
      </Grid>
    </GridRtl>
  )
}

export default DatePickerFlight