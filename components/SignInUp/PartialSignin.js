import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Dialog } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { updatePassword } from "firebase/auth";
import { auth } from '../../utils/firebase';
import { getDatabase, ref, update } from "firebase/database";

const theme = createTheme();

const PartialSignin = (props) => {
    const { onClose, open } = props;
    const handleClose = () => {
        onClose();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = auth.currentUser;

        if (user !== null) {
            updatePassword(user, data.get('password'))
                .then(() => {
                    console.log("Password updated successfully!");
                    const db = getDatabase();
                    update(ref(db, 'Users/' + user.uid), {
                        existingUser: 1,
                    });
                    handleClose();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };


    return (
        <>
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
                            <Typography component="h1" variant="h5">
                                התחברות ראשונית - אנא שנה סיסמא
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
                                    שנה סיסמא
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </Dialog>
        </>
    );
}
export default PartialSignin