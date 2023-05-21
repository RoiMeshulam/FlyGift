import React, { useContext, useState } from 'react'
import { Grid, Box, Typography, Dialog, Button, Container, TextField} from '@mui/material';
import { styled } from '@mui/system'
import { grey } from '@mui/material/colors';
import { getDatabase, ref, update } from "firebase/database";
import CreditCard from './CreditCard';
import { UserContext } from '../../UserContext';


const LoadingPoints = ({open, onClose }) => {
    const [isFirstStage, setIsFirstStage] = useState(true);
    const [amount, setAmount] = useState('');
    const {userUid, currCash, setCurrCash} = useContext(UserContext);

    const StyleButton = styled(Button)({
        background: grey[700], 
        height: '50px',
        width:'100px',
        fontSize:'24px',
        alignSelf:'center'
    });

    const handleClose = () => {
        onClose();
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleContinueButton = (event) => {
        setIsFirstStage(false);
      };

    const handlePaymentCreditCard = () => {
        const db = getDatabase();
        let plaster;
        plaster = "Users/" + userUid;
        let updateCash = Number(currCash) + Number(amount);
        console.log("updateCash: " + updateCash);
        update(ref(db, plaster), {
          currCash: updateCash,
        });
        setCurrCash(updateCash);
        alert("הטעינה התבצעה בהצלחה!")
        handleClose();
        
    };

  return (
    <Dialog onClose={handleClose} open={open} >
    <Container component="main" sx={{paddingTop:'20px' , paddingBottom:'20px'}}>
       {isFirstStage?
           <>
                  <Box height={'50%'}>
                            <Box marginTop={'5%'}>
                                <Typography variant='h3' sx={{direction:'rtl', textAlign:'center' ,alignSelf:'center'}}>הכנס/י את הסכום המבוקש</Typography>
                            </Box>
                            <Box marginBottom={'10%'} marginTop={'10%'} display={'flex'} justifyContent={'center'}>
                            <TextField
                                label="Amount"
                                variant="outlined"
                                type="number"
                                value={amount}
                                onChange={handleAmountChange}
                                inputProps={{
                                    min: '0',
                                    step: '0.01',
                                }}
                              
                                />
                            </Box>
                        </Box>
                        <Box height={'50%'}>
                            <Grid container height={'100%'} display={'flex'}>
                                <Grid item xs={6} style={{display:'flex', justifyContent:'center'}}>
                                    <Box alignSelf={'center'} justifyContent={'center'}>
                                        <StyleButton variant='contained' onClick={handleContinueButton}>אישור</StyleButton>
                                    </Box>
                                    
                                </Grid>
                                <Grid item xs={6} style={{display:'flex', justifyContent:'center'}}>
                                    <Box alignSelf={'center'} justifyContent={'center'}>
                                        <StyleButton variant='contained' onClick={handleClose}>ביטול</StyleButton>
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

export default LoadingPoints