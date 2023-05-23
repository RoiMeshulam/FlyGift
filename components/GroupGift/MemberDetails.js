import React from 'react'
import { Box, Typography, TextField} from "@mui/material";

const MemberDetails = ({name, email, amount }) => {
  return (
    <Box display="flex" flexDirection="row-reverse" justifyContent="right"  padding={'1%'}>
        <TextField
            label="שם"
            variant="outlined"
            value={name}
            sx={{ width: '20%', height: 50 , marginLeft:'5%' }}
        />
        <TextField
            label="אימייל"
            variant="outlined"
            value={email}
            sx={{ width: '30%', height: 40, marginLeft:'5%' }}
        />
        <TextField
            label="סכום"
            variant="outlined"
            value={amount}
            sx={{ width: '10%', height: 60 }}
            type="number"
        />
  </Box>
  )
}

export default MemberDetails