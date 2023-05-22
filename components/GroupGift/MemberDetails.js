import React from 'react'
import { Box, Typography, TextField} from "@mui/material";

const MemberDetails = () => {
  return (
    <Box display="flex" flexDirection="row-reverse" justifyContent="space-between">
    <TextField
      label="סכום"
      variant="outlined"
      sx={{ width: '20%', height: 60 }}
      type="number"
    />
    <TextField
      label="אימייל"
      variant="outlined"
      sx={{ width: '40%', height: 40 }}
    />
    <TextField
      label="שם"
      variant="outlined"
      sx={{ width: '30%', height: 50 }}
    />
  </Box>
  )
}

export default MemberDetails