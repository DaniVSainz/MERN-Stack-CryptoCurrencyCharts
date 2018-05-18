import React from 'react';

export default ({input, label, meta: {error,touched}}) => {
  return(
    <div>
      <label>{label}</label>
      <input {...input} style={{marginTop: '5px'}} />
      <div className="red-text" style={{marginBottom: '10px'}}>
        {touched && error}
      </div>
    </div>
  )
};