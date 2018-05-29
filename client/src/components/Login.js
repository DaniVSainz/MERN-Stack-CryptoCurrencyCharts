import React, { Component } from 'react';
import { reduxForm, Field } from "redux-form";
import * as actions from '../actions';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import renderTextField from '../utils/renderTextField';
import DoneIcon from '@material-ui/icons/Done';
import toasterOven from '../utils/myToasterOven';

class Login extends Component {

  async login(values){
    return this.props.login(values).then(async ()=>{
      toasterOven(this.props.auth.login);
      if(this.props.auth.login.status === 200){
        await this.props.saveToken(this.props.auth.login.data.token, this.props.auth.login.data.user);
        if(this.props.auth.login.status === 200){
          this.props.history.push('/');      
        }   
      }

    });
  }

  render() {
    const { pristine, submitting, invalid} = this.props;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper elevation={12}>
            <Typography variant="headline" gutterBottom>
              Login Form
            </Typography>
              <div>
                <form onSubmit={this.props.handleSubmit((values)=> this.login(values))}>
                  <Field component={renderTextField} autoComplete="username" label="username" name="username" type="text"></Field>
                  <Field component={renderTextField} autoComplete="current-password" label="password" name="password" type="password"></Field>
                  <Button type="submit" variant="raised" color="primary" disabled={ pristine || submitting || invalid} >
                    <DoneIcon />
                    Next
                  </Button>
                </form>
              </div>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

function mapStateTopProps({auth}){
  return {auth}
}

Login = connect(mapStateTopProps,actions)(Login);

export default reduxForm({form: "loginForm",})(Login);