import React from 'react'
import { Box, Typography,Button} from "@mui/material";
import MemberDetails from './MemberDetails';

const Group = () => {
    const [members,setMembers] = React.useState([]);
    const [membersFromCsv,setMembersFromCsv] = React.useState([]);
    const [isLoad, setIsLoad] = React.useState(false);
    let index = -1;


  return (
    <Box>
        <Button>טען קובץ csv</Button>
        {
            members.map((member) => (
                index=index+1,
                console.log(member),
                <Box sx={{height:'200px', display:'flex',alignItems:'center',padding:'1%'}}>
                    <MemberDetails member={member}/>
                </Box>    
            ))
        }
        <MemberDetails/>
        <Button>לוגו של פלוס</Button>
        



    </Box>
  )
}

export default Group