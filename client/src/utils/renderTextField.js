import React from 'react';
import TextField from '@material-ui/core/TextField';

export default ({input, label,meta: { touched, error }, ...custom}) => {
  return (
    <TextField
      label={label}
      error={ touched && error !=null }
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )
}