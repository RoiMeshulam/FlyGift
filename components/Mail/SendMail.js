import emailjs from 'emailjs-com';

export const sendEmailNewUser = (from_name, to_name, mail, value, password) => {
  const form = document.createElement('form');
  form.style.display = 'none';

  const inputFromName = document.createElement('input');
  inputFromName.type = 'hidden';
  inputFromName.name = 'from_name';
  inputFromName.value = from_name;
  form.appendChild(inputFromName);

  const inputToName = document.createElement('input');
  inputToName.type = 'hidden';
  inputToName.name = 'to_name';
  inputToName.value = to_name;
  form.appendChild(inputToName);

  const inputValue = document.createElement('input');
  inputValue.type = 'hidden';
  inputValue.name = 'value';
  inputValue.value = value;
  form.appendChild(inputValue);

  const inputStrongPassword = document.createElement('input');
  inputStrongPassword.type = 'hidden';
  inputStrongPassword.name = 'strong_password';
  inputStrongPassword.value = password;
  form.appendChild(inputStrongPassword);

  const inputToMail = document.createElement('input');
  inputToMail.type = 'hidden';
  inputToMail.name = 'to_mail';
  inputToMail.value = mail;
  form.appendChild(inputToMail);

  document.body.appendChild(form);

  emailjs
    .sendForm(
      'service_t0x21dk',
      'template_ks1uhsx',
      form,
      'Zj9zCtVO9zC-zC5Yx'
    )
    .then(
      () => {
        // alert('Message successfully sent!');
        // window.location.reload(false);
      },
      () => {
        // alert('Failed to send the message, please try again');
      }
    );

  // Remove the form from the DOM after sending the email
  document.body.removeChild(form);
};

export const sendEmailExistingUser = (from_name, to_name, mail, value) => {
  const form = document.createElement('form');
  form.style.display = 'none';

  const inputFromName = document.createElement('input');
  inputFromName.type = 'hidden';
  inputFromName.name = 'from_name';
  inputFromName.value = from_name;
  form.appendChild(inputFromName);

  const inputToName = document.createElement('input');
  inputToName.type = 'hidden';
  inputToName.name = 'to_name';
  inputToName.value = to_name;
  form.appendChild(inputToName);

  const inputValue = document.createElement('input');
  inputValue.type = 'hidden';
  inputValue.name = 'value';
  inputValue.value = value;
  form.appendChild(inputValue);

  const inputToMail = document.createElement('input');
  inputToMail.type = 'hidden';
  inputToMail.name = 'to_mail';
  inputToMail.value = mail;
  form.appendChild(inputToMail);

  document.body.appendChild(form);

  emailjs
    .sendForm(
      'service_t0x21dk',
      'template_4cpa4vr',
      form,
      'Zj9zCtVO9zC-zC5Yx'
    )
    .then(
      () => {
        // alert('Message successfully sent!');
        // window.location.reload(false);
      },
      () => {
        // alert('Failed to send the message, please try again');
      }
    );

  // Remove the form from the DOM after sending the email
  document.body.removeChild(form);
};
