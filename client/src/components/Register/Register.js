import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { reduxForm, Field } from "redux-form";
import * as actions from '../../actions';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import registerValidator from '../../utils/registerValidation';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';

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

function validate(values){
  let errors = registerValidator(values);
  return errors;
}


const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    error={ touched && error !=null }
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

class Register extends Component {

  register(values){
    console.log('Clicked Register from component', values);
    this.props.register(values);
  }
  
  render() {
    const { pristine,submitting,invalid } = this.props;

    return (
      <div>
        <Typography variant="headline" gutterBottom>
          Register Form
        </Typography>
        <div>
          <form onSubmit={this.props.handleSubmit((values)=> this.register(values))}>
            <Field component={renderTextField} autoComplete="username" label="username" name="username" type="text"></Field>
            <Field component={renderTextField} autoComplete="email" label="email" name="email" type="text"></Field>
            <Field component={renderTextField} autoComplete="new-password" label="password" name="password" type="password"></Field>
            <Field component={renderTextField} autoComplete="new-password" label="password" name="passwordB" type="password"></Field>
            <Button type="submit" variant="raised" color="primary" disabled={ pristine || submitting || invalid} >
              <DoneIcon />
              Next
            </Button>
          </ form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};
Register = reduxForm(
  {form: "registerForm",
    validate,
  })(Register)
Register = connect(null,actions)(Register);
export default withStyles(styles)(Register);