import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { reduxForm, Field } from "redux-form";
import * as actions from '../../actions';
import { connect } from 'react-redux';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

const validate = values => {
  const errors = {}
  const requiredFields = [
    'username',
    'email',
    'passwordA',
    'passwordB',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    errortext={touched && error}
    {...input}
    {...custom}
  />
)

class Register extends Component {

  register(values){
    console.log('Clicked Register from component');
    this.props.register(values);
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div>
        Hello from register
        <div>
          <form onSubmit={this.props.handleSubmit((values)=> this.register(values))}>
            <Field component={renderTextField} autoComplete="username" label="username" name="username" type="text"></Field>
            <Field component={renderTextField} autoComplete="email" label="email" name="email" type="text"></Field>
            <Field component={renderTextField} autoComplete="password" label="password" name="passwordA" type="password"></Field>
            <Field component={renderTextField} autoComplete="password" label="password" name="passwordB" type="password"></Field>
            <button type="submit" className="teal btn-flat right white-text" >
              Next
              <i className="material-icons right">done</i>
            </button>
          </ form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};
Register = reduxForm({form: "registerForm",})(Register)
Register = connect(null,actions)(Register);
export default withStyles(styles)(Register);