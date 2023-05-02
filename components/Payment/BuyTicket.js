import React from 'react'
import { Grid, Box, Typography, Dialog, Button, Container} from '@mui/material';
import { styled } from '@mui/system'
import { grey } from '@mui/material/colors';
import { getDatabase, ref, set, update } from "firebase/database";

const BuyTicket = ({open, onClose , isConor, amount, userUid}) => {

    const handleClose = () => {
        onClose();
    };

    const handlePayment = () => {
        console.log(userUid);
        console.log(amount)
        const db = getDatabase();
        let plaster;
        plaster = "Users/" + userUid;
        update(ref(db, plaster), {
          currCash: amount,
        });
        alert("הרכישה התבצעה בהצלחה, טיסה נעימה!")
        handleClose();
        
    };

    const handleCreditCharging = () => {
        onClose();
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
         <Container component="main" maxWidth="xs" sx={{height:'33vh'}} >
            {isConor ?
                <>
                    <Box height={'50%'} display={'flex'}>
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
                        <Box>
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
        </Container>
    </Dialog>
    
  )
}

export default BuyTicket