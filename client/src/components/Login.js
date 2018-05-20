import React, { Component } from 'react';
import { reduxForm, Field } from "redux-form";

class Login extends Component {
  render() {
    return (
      <div>
        Login Page
        <form onSubmit={this.props.handleSubmit((values)=> console.log(values))}>
          <Field component="input" label="email" name="email" type="text"></Field>
          <Field component="input" label="password" name="password" type="text"></Field>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "loginForm",
  // destroyOnUnmount:false
})(Login);