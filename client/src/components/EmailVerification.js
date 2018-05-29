import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class EmailVerification extends Component {
  state = { isVerified:false }

  componentDidMount(){
    const { match: { params } } = this.props;
    console.log(params);
  }

  render() {
    return (
      <div>
        <Typography variant="headline" gutterBottom>
          Email Verification
        </Typography>
      </div>
    );
  }
}

export default EmailVerification;