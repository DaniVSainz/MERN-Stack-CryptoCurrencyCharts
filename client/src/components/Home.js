import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class Home extends Component {
  render() {
    return (
      <Grid container spacing={24}>
        <Typography variant="body1" color="primary">
          Home Page 
        </Typography>      
      </Grid>
    );
  }
}

export default Home;