import { useEffect, useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

function SendMail() {

  const [fromName, setFromName] = useState('Arik Tatievski')
  const handleFromName = (event) => {
    setFromName(event.target.value);
  };
  const [toName, setToName] = useState('Roi Meshulam');
  const handleToName = (event) => {
    setToName(event.target.value);
  };

  const [toMail, setToMail] = useState('rohimesh21@gmail.com');
  const handleToMail = (event) => {
    setToMail(event.target.value);
  };

  const [value, setValue] = useState('500$');
  const handleValue = (event) => {
    setValue(event.target.value);
  };


  const form = useRef()

  const sendEmail = (e) => {
    console.log(form.current)
    e.preventDefault()
    emailjs
      .sendForm('service_t0x21dk', 'template_ks1uhsx', form.current, 'Zj9zCtVO9zC-zC5Yx')
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
      <div className="container contact-page">
        <div className="text-zone">
          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <div>To Name</div>
                  <input placeholder="Name" type="text" name="to_name" required onChange={handleToName}/>
                </li>
                <li className="half">
                  <div>To email</div>
                  <input
                    placeholder="Email"
                    type="email"
                    name="to_mail"
                    required
                    onChange={handleToMail}
                  />
                </li>
                <li>
                  <div>From Name</div>
                  <input
                    placeholder="Subject"
                    type="text"
                    name="from_name"
                    required
                    onChange={handleFromName}
                  />
                </li>
                <li>
                  <div>How much</div>
                  <textarea
                    placeholder="Value"
                    name="value"
                    required
                    onChange={handleValue}
                  ></textarea>
                </li>
                <li>
                  <input type="submit" className="flat-button" value="SEND" />
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default SendMail;