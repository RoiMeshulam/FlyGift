import { useState } from "react";
import React from 'react'
import { Box, TextField} from "@mui/material";

const MemberDetailsChangeable = ({name, email, amount , onChange, index }) => {
    const [nameMember,setNameMember] = useState(name);
    const [emailMember,setEmailMember] = useState(email);
    const [amountMember,setAmountMember] = useState(amount);

    const handleNameChange = (event) => {
        const newName = event.target.value;
        setNameMember(newName);
        const newValue = { name: newName, email: emailMember, amount: amountMember, index };
        onChange(index, newValue); 
    };
    
    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmailMember(newEmail);
        const newValue = { name: nameMember, email: newEmail, amount: amountMember, index };
        onChange(index, newValue); 
    };
    
    const handleAmountChange = (event) => {
        const newAmount = event.target.value;
        setAmountMember(newAmount);
        const newValue = { name: nameMember, email: emailMember, amount: newAmount, index };
        onChange(index, newValue); 
    };



    return (
        <Box display="flex" flexDirection="row-reverse" justifyContent="right"  padding={'1%'}>
            <TextField
                label="שם"
                variant="outlined"
                value={nameMember}
                sx={{ width: '20%', height: 50 , marginLeft:'5%' }}
                onChange={handleNameChange}
            />
            <TextField
                label="אימייל"
                variant="outlined"
                value={emailMember}
                sx={{ width: '30%', height: 40, marginLeft:'5%' }}
                onChange={handleEmailChange}
            />
            <TextField
                label="סכום"
                variant="outlined"
                value={amountMember}
                onChange={handleAmountChange}
                sx={{ width: '10%', height: 60 }}
                type="number"
            />
      </Box>
      )
}

export default MemberDetailsChangeable