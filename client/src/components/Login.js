import React, { Component } from 'react';
import { reduxForm, Field } from "redux-form";
import * as actions from '../actions';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


class Login extends Component {
  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="headline" gutterBottom>
              Login Form
            </Typography>
              <div>
                <form onSubmit={this.props.handleSubmit((values)=> this.props.login(values))}>
                  <Field component="input" label="username" name="username" type="text"></Field>
                  <Field component="input" label="password" name="password" type="text"></Field>
                  <button type="submit" className="teal btn-flat right white-text" >
                    Next
                    <i className="material-icons right">done</i>
                  </button>
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