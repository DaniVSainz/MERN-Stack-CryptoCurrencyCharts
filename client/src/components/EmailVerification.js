import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import { verifyEmail } from '../actions/'
import toasterOven from '../utils/myToasterOven';

class EmailVerification extends Component {
  state = { isVerified:false, res: null }

  componentDidMount(){
    this.callVerifyEmail(this.props.match.params.token);
  }

  async callVerifyEmail(token){
    this.setState({res: await verifyEmail(token) }) 
    toasterOven(this.state.res);
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