import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TextField from '@material-ui/core/TextField';

class ChatBox extends Component {

  state={
    textFieldValue: '',
  }

  emitMsg(){
    console.log(this.props)
    // this.state.socket.emitTest(this.state.textFieldValue)
    this.setState({textFieldValue: ''});
  }

  canJoinChat(){
    if(this.props.auth.user.user){}
  }

  renderMsgs(){
    this.props.chat.msgs.forEach((msg)=>{
      return(
        <span style={{color:'black'}}>
          {msg}
        </span>
      )
    })
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
              <div>
                <ul>
                  {this.renderMsgs()}
                </ul>
              </div>
              <button onClick={() => this.props.connected()}>Send msg chat</button>
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

function mapStateToProps({auth,chat}){
  return {
    user: auth.user.user,
    chat: chat
  }
}

export default connect(mapStateToProps, actions)(ChatBox);