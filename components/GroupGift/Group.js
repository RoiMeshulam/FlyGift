import React, { useContext, useRef, useState } from 'react';
import { Box, Typography, Button } from "@mui/material";
import { styled } from '@mui/system'
import { grey } from '@mui/material/colors';
import MemberDetails from './MemberDetails';
import FileButton from './FileButton';
import MemberDetailsChangeable from './MemberDetailsChangeable';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, child, update, get } from "firebase/database";
import { auth } from "../../utils/firebase";
import { UserContext } from '../../UserContext';
import NeedMoreMoney from '../Payment/NeedMoreMoney';
import { useNavigate } from 'react-router-dom';
import { sendEmailExistingUser, sendEmailNewUser} from '../Mail/SendMail';





const GreyButton = styled(Button)({
  background: grey[500]
});

const Group = () => {
  const [members, setMembers] = React.useState([{ email: '', name: '', amount: '', index:0 }]);
  const [membersFromCsv, setMembersFromCsv] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [amount,setAmount] = useState(0);
  const navigate = useNavigate();

  const fileReader = new FileReader();
  let index =-1;
  const {currCash , setCurrCash, userUid} = useContext(UserContext);

  const handleClose= () =>{
    setOpen(false);
  };
  
  const updateItemValue = (index, newValue) => {
    setMembers(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index] = newValue;
      return updatedItems;
    });
  };

  const csvFileToArray = string => {
    const csvHeader = ["email", "name", "amount"];
    const csvData = string.slice(string.indexOf("\n") + 1).split("\n");

    const Array = csvData.map(row => {
      const rowValues = row.split(",");
      const obj = csvHeader.reduce((object, curr, i) => {
        object[curr] = rowValues[i];
        return object;
      }, {});
      return obj;
    });
    console.log(Array)
    setMembersFromCsv(Array);
    // pay();
  };

  const handleFileSelect = (file) => {
    console.log('fileSelected')
    console.log(file)
    console.log(currCash);

    // e.preventDefault();
    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        csvFileToArray(csvOutput);
      };
      fileReader.readAsText(file);
    }
  };
 
  const createNewUser = (name,email,amount) => {
    const currPass = generatePassword(12);
    if (true) {
        createUserWithEmailAndPassword(
        auth,
        email,
        currPass
        ).then((userCredential) => {
        const user = userCredential.user;
        const db = getDatabase();
        let plaster;
        plaster = "Users/" + user.uid;
        set(ref(db, plaster), {
            email: email,
            currCash: amount,
            existingUser: 0,
        });
        // handleClose();
        });
    }
    return currPass;
  };
   
  const checkUserByEmail = (useremail, username, useramount) => {
    const db = getDatabase();
    const dbRef = ref(db);
    let b=false;
    get(child(dbRef, 'Users')).then((snapshot) => {
      if (snapshot.exists()) {
        const curUser = snapshot.val();
        Object.keys(curUser).forEach((userId) => {
            if(curUser[userId].email === useremail){
                const user = curUser[userId];
                console.log(user);
                const cash = parseInt(user.currCash) + parseInt(useramount);
                user.currCash = cash;
                update(ref(db, 'Users/' + userId), {
                    currCash : cash,
                });
                sendEmailExistingUser("fromName", "toName", "ariktatievski@gmail.com", "");
                
                // sendEmail(user.firstName, user.email, user.currCash, user.password);
                b=true;
                console.log("user Found and updated");
            }

        });
      } if(!b) {  
        let currPass = createNewUser(username, useremail, useramount);
        console.log("created new user");
        sendEmailNewUser("fromName", "toName", "ariktatievski@gmail.com", "", currPass);
        //send email
      }
    });
  };

  const hasCash = (list) => {
    let sumOfAmount = 0;
    list.map((member) => {
      sumOfAmount = Number(sumOfAmount) + Number(member.amount);
    });
  
    const isCashEnough = currCash >= sumOfAmount;
    const difference = currCash - sumOfAmount;
  
    return [isCashEnough, difference];
  };

  const handleChargeButton = () => {
    let list;
  
    if (membersFromCsv.length === 0) {
      list = members;
    } else {
      list = membersFromCsv;
    }
  
    const [isCashEnough, difference] = hasCash(list);
  
    if (!isCashEnough) {
      // popUp creditCard
      setOpen(true);
      setAmount(Math.abs(difference));
    }else{
        list.map((member) => {
            checkUserByEmail(member.email, member.name, member.amount);
        });
        
        updateCash(difference);
        alert("הטעינה התבצעה בהצלחה")
        // navigate('/');
    }
  
    
  };

  const handleAddButton = () => {
    const newMember = { email: '', name: '', amount: '', index:members.length};
    const updatedMembers = [...members];
    updatedMembers.push(newMember);
    setMembers(updatedMembers);
  };

  const generatePassword = (length) => {
    const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-={}[]<>?`~";
    let result = "";
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset[randomIndex];
    }
    return result;
  };

   const updateCash = (newAmount) => {
        const db = getDatabase();
        let plaster;
        plaster = "Users/" + userUid;
        update(ref(db, plaster), {
        currCash: newAmount,
        });
        setCurrCash(newAmount);

  };

  const handleCreditCharging = () => {
    console.log("handleCreditCardCharging");
    let list;
  
    if (membersFromCsv.length === 0) {
      list = members;
    } else {
      list = membersFromCsv;
    }
    list.map((member) => {
        checkUserByEmail(member.email, member.name, member.amount);
    });
    
    updateCash(0);
    setOpen(false);
    alert("הטעינה התבצעה בהצלחה")
    // navigate('/');

  }
 

  return (
    <Box sx={{ background: '#F0E68C', width: '100%' }}>
      <Box display={'flex'} justifyContent={'right'} padding={'1%'}>
        <FileButton onFileSelect={handleFileSelect} />
      </Box>
        {
            membersFromCsv.length == 0 ? 
            <>
            {
                 members.map((member) => (
                    <Box>
                        <MemberDetailsChangeable key={member.index} name={member.name} email={member.email} amount={member.amount} onChange={updateItemValue} index={member.index}/>
                    </Box>    
                ))
        
            }
            <Box display={'flex'} justifyContent={'center'} padding={'1%'}>
                <GreyButton size={'Large'} variant="contained" onClick={handleAddButton}>פלוס</GreyButton>
            </Box>

         </>
            :
            <>
            {
                 membersFromCsv.map((member) => (
                    index=index+1,
                    console.log(member),
                    <Box>
                        <MemberDetails key={index} name={member.name} email={member.email} amount={member.amount} />
                    </Box>    
                ))
        
            }
         </>
        }
      
      <Box display={'flex'} justifyContent={'left'} padding={'1%'}>
        <GreyButton size={'Large'} variant="contained" onClick={handleChargeButton}>טען</GreyButton>
        <NeedMoreMoney
            open={open}
            onClose={handleClose}
            handlePayment={handleCreditCharging}
            amount = {amount}
        />
      </Box>
    </Box>
  );
};

export default Group;
