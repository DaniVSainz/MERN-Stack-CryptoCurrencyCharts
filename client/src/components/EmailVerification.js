import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import { verifyEmail } from '../actions/'
import toasterOven from '../utils/myToasterOven';

class EmailVerification extends Component {
  state = { isVerified:false }

  componentDidMount(){
    this.callVerifyEmail(this.props.match.params.token);
  }

  async callVerifyEmail(token){
    let res = await verifyEmail(token);
    toasterOven(res);
  }

  render() {
    return (
      <div>
        <Typography variant="headline" gutterBottom>
          Email Verification
        </Typography>
        <Paper>

        </Paper>
      </div>
    );
  }
}

export default EmailVerification;