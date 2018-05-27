export default (values) => {
  const errors = {};

  if(!values.username){
    errors['username'] = 'Please enter a username';
  }

  //Use common regex pattern to check if email is valid
  if(!values.email){
    errors['email'] = 'Please enter a email';
  }else if(values.email){
     // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let isValid = re.test(values.email);
    //If pattern == false show error message
    if(!isValid){
      errors['email'] = "Please enter a valid email"
    }
  }

  //Check if passwords are null or empty.
  //If Not check if they are the same.
  if(!values.password){
    errors['password'] = 'Please enter a password';
  }
  if(!values.passwordB){
    errors['passwordB'] = 'Please enter a password';
  }else if(values.password && values.passwordB){
    if(values.password !== values.passwordB){
      errors['password'] = 'Your passwords are not the same';
      errors['passwordB'] = 'Your passwords are not the same';
    }
  }

  return errors;
}