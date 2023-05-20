import React, { useContext } from 'react'
import pic from './account.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faShekelSign } from '@fortawesome/free-solid-svg-icons';
import { Grid, Typography, Box } from '@mui/material';
import { UserContext } from '../../UserContext';



const MyProfile = () => {
    const {userInfo, currCash} = useContext(UserContext);
    
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
            <button id='btn'>טעינת נקודות</button>
        </Box>
    </Box>
  )
}

export default MyProfile