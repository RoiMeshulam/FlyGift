import React from 'react'
import { Grid, Box, Typography} from '@mui/material';
import { styled } from '@mui/system'
import logo from '../../img/FlyGiftLogo.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';
import NavItem from './NavItem';
import { Link } from "react-router-dom";
import Signin from '../SignInUp/Signin';
import Signup from '../SignInUp/Signup';


const StyledLink = styled(Link)(({ theme }) => ({
    color: 'inherit', /* use the current color */
    textDecoration: 'none', /* add underline for unvisited links */
    '&:visited': {
      color: 'black', /* change the color for visited links */
      textDecoration: 'none', /* remove the underline for visited links */
    },
}));



const Navbar = ({setUserInfo, userInfo, isConnected, setIsConnected}) => {
    const [openSignIn, setOpenSignIn] = React.useState(false);
    const [openSignUp, setOpenSignUp] = React.useState(false);

    const handleClickSignInOpen = () => {
        setOpenSignIn(true);
      };
    
    const handleSignInClose = () => {
        setOpenSignIn(false);
    };

    const handleClickSignUpOpen = () => {
        setOpenSignUp(true);
    };

    const handleSignUpClose = () => {
        setOpenSignUp(false);
    };

    const handleClickMyAccount = () => {
        alert("יש לבצע התחברות")
    };




  return (
    <Grid container height={250}>
        <Grid item md={6}>
            <Link to="/">
                <img src={logo}/>
            </Link>       
        </Grid>
        <Grid item md={6}>
            <Box>
                <Box height={80} display={'flex'} justifyContent={'right'}>
                    <Box alignSelf={'center'} marginRight={'5%'} >
                        <>
                            {
                                !isConnected ?
                               <> 
                               שלום אורח
                               <AccountCircleIcon sx={{fontSize:'50px'}} onClick={handleClickSignInOpen}/>
                                <Signin
                                    open={openSignIn}
                                    onClose={handleSignInClose}
                                    setUserInfo={setUserInfo}
                                    setIsConnected={setIsConnected}
                                />
                               
                               </>
                                :
                               <> 
                               שלום {userInfo.firstName}
                               <AccountCircleIcon sx={{fontSize:'50px'}}/>    
                               </>
                            }
                        </>
                    </Box>
                    
                </Box>
                <Grid container height={170}>
                    <Grid item sm={3}></Grid>
                    <Grid item sm={2}>
                        <StyledLink to="/companyLogin">
                            <NavItem icon={BusinessIcon} text={'כניסה לחברות'}/>
                        </StyledLink>
                    </Grid>
                    <Grid item sm={2}>
                        <StyledLink to="/GroupPresent">
                            <NavItem icon={GroupsIcon} text={'מתנה קבוצתית'}/>
                        </StyledLink>
                    </Grid>
                    <Grid item sm={2}>
                        {!isConnected ?
                        <>
                            <NavItem icon={LocalAtmIcon} text={'החשבון שלי'} onClick={handleClickMyAccount}/>
                        </>
                        :
                        <>
                            <StyledLink to="/myAccount">
                                <NavItem icon={LocalAtmIcon} text={'החשבון שלי'}/>
                            </StyledLink>
                        </>
                        }
                        
                    </Grid>
                    <Grid item sm={2}>
                        <NavItem icon={PostAddIcon} text={'הרשמה'} onClick={handleClickSignUpOpen}/>
                        <Signup
                            open={openSignUp}
                            onClose={handleSignUpClose}
                        />
                    </Grid>
                    <Grid item sm={1}></Grid>
                </Grid>
            </Box>
        </Grid>
    </Grid>
  )
}

export default Navbar