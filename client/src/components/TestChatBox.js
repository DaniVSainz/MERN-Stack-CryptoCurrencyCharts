import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import * as actions from '../actions';
import socket from '../utils/socket'
import TextField from '@material-ui/core/TextField';

class ChatBox extends Component {

  state={
    socket: socket(),
    textFieldValue: ''
  }

  emitMsg(){
    this.state.socket.emitTest(this.state.textFieldValue)
    this.setState({textFieldValue: ''});
  }

  canJoinChat(){
    if(this.props.auth.user.user){}
  }

  async handleTextFieldChange(e){
    await this.setState({
      textFieldValue: e.target.value
    });
    console.log(this.state.textFieldValue)
  }

  render() {

    return (
      <div style={{backgroundColor: 'white'}}>
        <div>
          <Draggable
          axis="x"
          handle=".handle"
          defaultPosition={{x: 0, y: 0}}
          position={null}
          grid={[25, 25]}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}
          
          >
            <div style={{border:'1px solid black', width:'fit-content'}}>
              <div className="handle">Drag from here</div>
              <div>This readme is really dragging on...</div>
              <button onClick={this.emitMsg.bind(this)}>Connect to chat</button>
              <TextField label="Message...." 
                value={this.state.textFieldValue}
                onChange={this.handleTextFieldChange.bind(this)}
                onSubmit={()=> this.emitMsg()}
                style={{color:'black'}}
              >
                {this.state.textFieldValue}
              </TextField>
            </div>
          </Draggable>
        </div>
      </div>
    );
  }
}

function mapStateToProps({auth}){
  return {
    user: auth.user.user
  }
}

export default connect(mapStateToProps, actions)(ChatBox);