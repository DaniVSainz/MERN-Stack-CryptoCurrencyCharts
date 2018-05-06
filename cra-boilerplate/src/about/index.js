import React from 'react'
import { Container } from 'reactstrap';
import './style.css';

class About extends React.Component {

  render() {

    return (
    	<div id="about">
	    	<Container>
	    		<h2 className="text-center">
		        CryptoNalysis
		      </h2>
		      <p>CryptoNalysis page content</p>
			  </Container>
		  </div>
    );
  }

}

export default About;