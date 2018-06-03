import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import * as actions from '../actions';
import socket from '../utils/socket'

class ChatBox extends Component {

  state={
    socket: socket(),
  }

  emitMsg(){
    console.log(this.props)
    this.socket.emit('my other event', 'Hi from react')
  }

  canJoinChat(){
    if(this.props.auth.user.user){}
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
              <button onClick={()=> this.emitMsg()}>Connect to chat</button>
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