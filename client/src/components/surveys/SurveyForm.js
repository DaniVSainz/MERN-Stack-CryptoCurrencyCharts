import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import _ from 'lodash';
import {Link} from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';


class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name}) => {
      return (
        <Field component={SurveyField} type="text" label={label} name={name} key={name} />
      );
    });
  }

  render() {
    return (
      //Handle submit comes from redux form
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit) }>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text"> Cancel </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
          
        </form>
      </div>
    );
  }
}

function validate(values){
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({name}) =>{
    if(!values[name]){
      errors[name] = 'You need to fill out the field'
    }
  });


  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount:false
})(SurveyForm);
