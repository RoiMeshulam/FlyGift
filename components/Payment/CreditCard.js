import React from 'react'
import { render } from 'react-dom'
import Card from 'react-credit-cards'
import { styled } from '@mui/system'
import { grey } from '@mui/material/colors';
//################################# npm install 'react-credit-cards' ################################ 
// import './styles.css'
import { getDatabase, ref, get, child } from "firebase/database";
import { Box, Typography, TextField , Button} from '@mui/material';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './utils'

import 'react-credit-cards/es/styles-compiled.css'

const StyleButton = styled(Button)({
  background: grey[700], 
  height: '50px',
  width:'100px',
  fontSize:'24px',
  alignSelf:'center',
  color: 'white',
  '&:hover': { background:   'black' }
});

export default class CreditCard extends React.Component {
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null
  }

 

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer })
    }
  }

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    })
  }

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value)
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value)
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value)
    }

    this.setState({ [target.name]: target.value })
  }

  handleSubmit = (event) => {
    if (true) {
      event.preventDefault();
      const fixNum = "" + this.state.number;
      const splitNum = fixNum.split(' ')
      const cominedNum = "" + splitNum[0] + splitNum[1] + splitNum[2] + splitNum[3]
      const dbRef = ref(getDatabase());
      get(child(dbRef, `CreditCards/${cominedNum}`)).then((snapshot) => {
        if (snapshot.exists()) {
          if (snapshot.val().cvc == this.state.cvc && snapshot.val().expiry == this.state.expiry) {
            console.log("correct cred")
          }
          else {
            console.log("wrong cred")
          }
          alert("Credit Card Exists")
          this.props.onClick();

        } else {
          alert("Credit Card doesnt exist")
        }
      })
        .catch((error) => {
          console.log('ERROR: sign in')
        });
    }
  }


  render() {
    const { name, number, expiry, cvc, focused, issuer } = this.state

    return (
      <Box>
        <Typography variant='h4' textAlign={'center'} marginTop={'10px'} marginBottom={'10px'}>Enter your payment details</Typography>
        <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
           <Box display="flex" justifyContent="center" alignItems="center" marginTop={'20px'}>
              <Typography variant="h6" marginRight={'5px'}>Name on card:</Typography>
              <TextField sx={{textAlign:'center'}}
                type='text'
                name='name'
                placeholder='Name'
                pattern='[a-z A-Z-]+'
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" margin={1}>
              <Typography variant="h6" marginRight={'5px'}>Card Number:</Typography>
              <TextField 
                  type='tel'
                  name='number'
                  className='form-control'
                  placeholder='Card Number'
                  pattern='[\d| ]{16,22}'
                  maxLength='19'
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
              
              />
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" margin={1}>
              <Typography variant="h6" marginRight={'5px'}>Expiration Date:</Typography>
              <TextField 
                type='tel'
                name='expiry'
                className='form-control'
                placeholder='Valid Thru'
                pattern='\d\d/\d\d'
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" margin={1}>
              <Typography variant="h6" marginRight={'5px'}>CVC:</Typography>
              <TextField 
                type='tel'
                name='cvc'
                className='form-control'
                placeholder='CVC'
                pattern='\d{3}'
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}   
              />
            </Box>
            <Box display={'flex'} justifyContent={'center'} marginTop={'20px'}>
              <StyleButton onClick={this.handleSubmit}>Submit</StyleButton>

            </Box>
      </Box>
    )
  }
}

render(<CreditCard />, document.getElementById('root'))

