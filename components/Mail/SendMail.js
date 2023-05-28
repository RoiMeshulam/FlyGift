import { useEffect, useState, useRef } from 'react'
import emailjs from 'emailjs-com';

function SendMail() {

  const sendEmail =(fromName, toName, toMail, value) => {
    // console.log(form.current)
    emailjs
      .sendForm('service_t0x21dk', 'template_ks1uhsx', {
        from_name: fromName,
        to_name: toName,
        to_mail: toMail,
        value: value,}, 'Zj9zCtVO9zC-zC5Yx')
      .then(
        () => {
          alert('Message successfully sent!')
          window.location.reload(false)
        },
        () => {
          alert('Failed to send the message, please try again')
        }
      )
  }

  return (
    <>
     
    </>
  );
}
export default SendMail;