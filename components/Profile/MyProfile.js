import React, { useContext } from 'react'
import pic from './account.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faShekelSign } from '@fortawesome/free-solid-svg-icons';
import { Grid, Typography, Box, Button} from '@mui/material';
import { UserContext } from '../../UserContext';
import LoadingPoints from '../Payment/LoadingPoints';
import { styled } from '@mui/system'
import { grey } from '@mui/material/colors';

const GreyButton = styled(Button)({
    background: grey[500]
});

const MyProfile = () => {
    const {userInfo, currCash} = useContext(UserContext);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleLoadingButton = () => {
        setOpen(true);
    };
    
    console.log(userInfo)
  return (
    <Box>
        <Box>
            <Typography variant='h3' textAlign={'center'}>!{userInfo.firstName} {userInfo.lastName} שלום</Typography>
            <Grid container justifyContent={'center'} marginTop={'1%'}>
                <Grid item>
                    <Box display='flex' flexDirection='column' alignItems={'center'} marginTop={'55%'} marginRight={'12px'}>
                        <Box display='flex' flexDirection='row'>
                            <FontAwesomeIcon icon={faShekelSign} style={{color: "#0f0f0f" , marginRight:'3px'}} />
                            {currCash}                          
                        </Box>
                            להזמנת טיסה
                        </Box>
                </Grid>
                <Grid item><img src={pic} alt='prof'/>
                </Grid>

                <Grid item>
                    <Typography variant='h5' fontWeight={'500'}>בחשבונך</Typography>
                </Grid>
            </Grid>
        </Box>
        <Box display={'flex'} justifyContent={'center'} marginBottom={'1%'}>
            <GreyButton size={'Large'} variant="contained" onClick={handleLoadingButton}>טעינת נקודות</GreyButton>
            <LoadingPoints
                open={open}
                onClose={handleClose}
            />
        </Box>
    </Box>
  )
}

export default MyProfile