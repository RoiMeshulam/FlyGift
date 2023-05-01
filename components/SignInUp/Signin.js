import React from 'react'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../utils/firebase';
import { getDatabase, ref, get, child } from "firebase/database";
import { Dialog } from '@mui/material';
import PartialSignin from './PartialSignin'




const theme = createTheme();

const Signin = (props) => {
    const { onClose, open, setUserInfo, setIsConnected } = props;
    const [newUserResetPassword, setNewUserResetPassword] = useState(true);
    const handleNewUserResetPassword = (event) => {
        setNewUserResetPassword(!newUserResetPassword);
    };
    const handleClose = () => {
        onClose();
    };
    const handleSubmit = React.useCallback((event) => {
        if (true) {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            console.log({
                email: data.get('email'),
                password: data.get('password'),
            });
            signInWithEmailAndPassword(auth, data.get('email'), data.get('password'))
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const dbRef = ref(getDatabase());
                    get(child(dbRef, `Users/${user.uid}`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            console.log(snapshot.val());
                            setUserInfo(snapshot.val());
                            setIsConnected(true)
                            if (snapshot.val().existingUser == 0) {
                                handleNewUserResetPassword();
                            } else {
                                handleClose();
                            }
                        } else {
                            alert("user doesn't exist")
                        }
                    })

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log('ERROR: sign in')
                });
        }
    }, [true])



    return (
            <> {newUserResetPassword ?
                <Dialog onClose={handleClose} open={open}>
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign In
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </Dialog>
                :
                <Dialog onClose={handleClose} open={open} >
                    <PartialSignin
                        onClose={handleClose}
                    />
                </Dialog>
            }
            </>
            
    );
}
export default Signin