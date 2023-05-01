import React from 'react'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAuth, updatePassword } from "firebase/auth";
import { auth } from '../../utils/firebase';
import { getDatabase, ref, child, get, update } from "firebase/database";

const theme = createTheme();

const PartialSignin = (props) => {
    const { onClose } = props;
    const [signSuccess, setSignSuccess] = useState(true);
    const handleSignType = (event) => {
        setSignSuccess(!signSuccess);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        //const auth = getAuth();
        const user = auth.currentUser;

        if (user !== null) {
            updatePassword(user, data.get('password'))
                .then(() => {
                    console.log("Password updated successfully!");
                    const db = getDatabase();
                    update(ref(db, 'Users/' + user.uid), {
                        existingUser: 1,
                    });

                    onClose();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };


    return (
        <>
            {signSuccess ?
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
                            <Typography component="h1" variant="h5">
                                First Sign in - Change Password
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                                    Change Password
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
                :
                <div>Yessirrr</div>
            }

        </>
    );
}
export default PartialSignin