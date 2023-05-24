import React, { useState } from 'react'
import { Grid, Box, Typography, Dialog, Button, Container} from '@mui/material';
import { styled } from '@mui/system'
import { grey } from '@mui/material/colors';
import CreditCard from './CreditCard';


const StyleButton = styled(Button)({
    background: grey[700], 
    height: '50px',
    width:'100px',
    fontSize:'24px',
    alignSelf:'center'
});
    


const NeedMoreMoney = ({open, onClose, handlePayment, amount}) => {
    const [creditCharge, setCreditCharge] = useState(false);


    const handleClose = () => {
        onClose();
    };

    const handleContinue = () => {
        setCreditCharge(true);
    }

    const handlePaymentCreditCard = () =>{
        handlePayment();
    }

  return (
    <Dialog onClose={handleClose} open={open} >
        <Container component="main" sx={{paddingTop:'20px' , paddingBottom:'20px'}}>
        {!creditCharge?
        <>
            <Box height={'50%'}>
                <Box marginTop={'5%'}>
                    <Typography variant='h3' sx={{direction:'rtl', textAlign:'center' ,alignSelf:'center'}}>עליך להוסיף {amount}$</Typography>
                </Box>
                <Box marginBottom={'10%'}>
                    <Typography variant='h3' sx={{direction:'rtl', textAlign:'center' ,alignSelf:'center'}}>האם אתה בטוח?</Typography>
                </Box>
            </Box>
            <Box height={'50%'}>
                <Grid container height={'100%'} display={'flex'}>
                    <Grid item xs={6} style={{display:'flex', justifyContent:'center'}}>
                        <Box alignSelf={'center'} justifyContent={'center'}>
                            <StyleButton variant='contained' onClick={handleContinue}>כן</StyleButton>
                        </Box>
                        
                    </Grid>
                    <Grid item xs={6} style={{display:'flex', justifyContent:'center'}}>
                        <Box alignSelf={'center'} justifyContent={'center'}>
                            <StyleButton variant='contained' onClick={handleClose}>לא</StyleButton>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            </>
             :
             <>
                 <CreditCard onClick={handlePaymentCreditCard}/>
             </>
     }            
        </Container>
    </Dialog>
  )
}

export default NeedMoreMoney