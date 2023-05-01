import React from 'react'
import { render } from 'react-dom'
import Card from 'react-credit-cards'
//################################# npm install 'react-credit-cards' ################################ 
// import './styles.css'
import { getDatabase, ref, get, child } from "firebase/database";



import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './utils'

import 'react-credit-cards/es/styles-compiled.css'
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
      <div key='Payment'>
        <div className='App-payment'>
          <h1>Enter your payment details</h1>
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <small>Name on card:</small>

              <input
                type='text'
                name='name'
                className='form-control'
                placeholder='Name'
                pattern='[a-z A-Z-]+'
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className='form-group'>
              <small>Card Number:</small>

              <input
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
            </div>

            <div className='form-group'>
              <small>Expiration Date:</small>

              <input
                type='tel'
                name='expiry'
                className='form-control'
                placeholder='Valid Thru'
                pattern='\d\d/\d\d'
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className='form-group'>
              <small>CVC:</small>

              <input
                type='tel'
                name='cvc'
                className='form-control'
                placeholder='CVC'
                pattern='\d{3}'
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <input type='hidden' name='issuer' value={issuer} />
            <div className='form-actions'>
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

render(<CreditCard />, document.getElementById('root'))

