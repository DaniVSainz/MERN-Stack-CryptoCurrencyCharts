import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import ChatIcon from '@material-ui/icons/Chat'
import CloseIcon from '@material-ui/icons/Close'


class ChatBox extends Component {

  state={
    textFieldValue: '',
  }

  emitMsg(){
    actions.emitMsg(this.state.textFieldValue);
    this.setState({textFieldValue: ''});
  }

  canJoinChat(){
    if(this.props.auth.user.user){}
  }

  renderMsgs(){
    console.log(this.props.ui)
    let listItems;
    if(this.props.chat.msgs.length > 0 ){
      listItems = this.props.chat.msgs.map((msg)=>{
        return <li>{msg}</li>
      });
      return(
        <ul>
          {listItems}
        </ul>
      )
    }
  }

  renderButtonOrChat(){
    if(this.props.ui.chat){
      return(
        <div style={{border:'1px solid black', width:'fit-content',backgroundColor: 'white', zIndex:1202, height:'fit-content', position:'absolute',bottom:'10px',right:'10px'}}>
          <div className="handle">
            Drag from here
            <CloseIcon onClick={()=> this.props.closeChat()}></CloseIcon>
          </div>
          <div>
            {this.renderMsgs()}
          </div>
          <button onClick={() => this.emitMsg()}>Send msg chat</button>
          <TextField label="Message...." 
            value={this.state.textFieldValue}
            onChange={this.handleTextFieldChange.bind(this)}
            onSubmit={()=> this.emitMsg()}
            style={{color:'black'}}
          >
            {this.state.textFieldValue}
          </TextField>
        </div>
      )
    }else{
      return(
        <Button className="handle" onClick={()=> this.props.openChat()}variant="fab" mini color="primary" aria-label="chat">
          <ChatIcon />
        </Button>
      )
    }
  }

  async handleTextFieldChange(e){
    await this.setState({
      textFieldValue: e.target.value
    });
  }

  render() {

    return (
      <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{x: 0, y: 0}}
      position={null}
      grid={[25, 25]}
      onStart={this.handleStart}
      onDrag={this.handleDrag}
      onStop={this.handleStop}
      bounds="body"
      >
      <div style={{border:'1px solid black', width:'fit-content',backgroundColor: 'white', zIndex:1202, height:'fit-content', position:'absolute',bottom:'10px',right:'10px'}}>
          {this.renderButtonOrChat()}
      </div>
      </Draggable>
    );
  }
}

function mapStateToProps({auth,chat,ui}){
  return {
    user: auth.user.user,
    chat: chat,
    ui: ui
  }
}

export default connect(mapStateToProps, actions)(ChatBox);