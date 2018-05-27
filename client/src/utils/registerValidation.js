export default (values) => {
  const errors = {};
  console.log(values);
  if(!values.username){
    errors['username'] = 'Please enter a username';
  }

  if(!values.email){
    errors['email'] = 'Please enter a email';
  }

  if(!values.password){
    errors['password'] = 'Please enter a password';
  }

  if(!values.passwordB){
    errors['passwordB'] = 'Please enter a password';
  }
  return errors;
}