import React, { useState } from 'react';
import { Grid, Box, Typography , Button} from "@mui/material";
import FlightDetails from "./FlightDetails";
import BuyTicket from "../Payment/BuyTicket";

const FlightTicket = ({flight , oneDirection , isConnected, userInfo, userUid}) => {
    const [open, setOpen] = React.useState(false);
    const [isConor, setIsConor] = React.useState(false);
    const [amount,setAmount] = React.useState(0);
    const {price, route} = flight;

    const handleSelectClick = (event) => {
        if(!isConnected){
            alert("יש לבצע התחברות על מנת לרכוש כרטיס טיסה")
        }
        else{
            const {currCash} = userInfo;
            console.log(currCash)
            if(currCash >= price){
                setAmount(currCash-price)
                setIsConor(true)
                setOpen(true)
            }
            else{
                setAmount(price-currCash)
                setIsConor(false)
                setOpen(true)                
            }
        }
        
    };

    const handleClose = () => {
        setOpen(false);
    };
    
  return (
    
    <Grid container sx={{background:'white'}}>
        <Grid item sm={8}>
            {!oneDirection ?
                 <>
                    <Box>
                        <FlightDetails route={route[0]}/>
                    </Box>
                    <Box marginTop={"3%"}>
                        <FlightDetails route={route[1]}/>
                    </Box>
                </>
                :
                <Box>
                    <FlightDetails route={route[0]}/>
                </Box>
            }
            
        </Grid>
        <Grid item sm={4} display={'flex'} justifyContent={'center'}>
            <Box alignSelf={'center'}>
                <Typography variant="h5" textAlign={'center'} >${price}</Typography>
                <Button variant="contained" color="success" onClick={handleSelectClick}>Select</Button>
                <BuyTicket
                    open={open}
                    onClose={handleClose}
                    isConor={isConor}
                    amount={amount}
                    userUid={userUid}
                
                />
            </Box>
        </Grid>



    </Grid>
  )
}

export default FlightTicket