import React, { useContext } from 'react'
import { Grid, Box, Typography, Dialog, Button, Container} from '@mui/material';
import { styled } from '@mui/system'
import { grey } from '@mui/material/colors';
import { getDatabase, ref, update } from "firebase/database";
import CreditCard from './CreditCard';
import { UserContext } from '../../UserContext';

const BuyTicket = ({open, onClose , isConor, amount}) => {
    const [creditCharge, setCreditCharge] = React.useState(false)
    const {userUid , setCurrCash} = useContext(UserContext);

    const handleClose = () => {
        setCreditCharge(false)
        onClose();
    };

    const handlePayment = () => {
        const db = getDatabase();
        let plaster;
        plaster = "Users/" + userUid;
        update(ref(db, plaster), {
          currCash: amount,
        });
        setCurrCash(amount);
        alert("הרכישה התבצעה בהצלחה, טיסה נעימה!")
        handleClose();
        
    };

    const handlePaymentCreditCard = () => {
        const db = getDatabase();
        let plaster;
        plaster = "Users/" + userUid;
        update(ref(db, plaster), {
          currCash: 0,
        });
        setCurrCash(0);
        alert("הרכישה התבצעה בהצלחה, טיסה נעימה!")
        handleClose();
        
    };

    const handleCreditCharging = () => {
        setCreditCharge(true)
    };

const StyleButton = styled(Button)({
    background: grey[700], 
    height: '50px',
    width:'100px',
    fontSize:'24px',
    alignSelf:'center'
});
    

  return (
    <Dialog onClose={handleClose} open={open} >
         <Container component="main" sx={{paddingTop:'20px' , paddingBottom:'20px'}}>
            {!creditCharge?
                <>
                {isConor ?
                    <>
                        <Box height={'50%'} display={'flex'} marginBottom={'10%'}>
                            <Typography variant='h3' sx={{direction:'rtl', textAlign:'center' ,alignSelf:'center'}}>האם אתה בטוח?</Typography>
                        </Box>
                        <Box height={'50%'}>
                            <Grid container height={'100%'} display={'flex'}>
                                <Grid item xs={6} style={{display:'flex', justifyContent:'center'}}>
                                    <Box alignSelf={'center'} justifyContent={'center'}>
                                        <StyleButton variant='contained' onClick={handlePayment} >כן</StyleButton>
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
                                        <StyleButton variant='contained' onClick={handleCreditCharging}>כן</StyleButton>
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
            
                }
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

export default BuyTicket