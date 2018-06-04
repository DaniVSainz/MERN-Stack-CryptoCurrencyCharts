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
    actions.emitMsg(this.state.textFieldValue);
    this.setState({textFieldValue: ''});
  }

  canJoinChat(){
    if(this.props.auth.user.user){}
  }

  renderMsgs(){
    console.log('RENDER_MSGS',this.props.chat.msgs)
    let listItems;
    if(this.props.chat.msgs.length > 0 ){
      listItems = this.props.chat.msgs.map((msg)=>{
        return <li>{msg}</li>
      });
      console.log(listItems);
      return(
        <ul>
          {listItems}
        </ul>
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
          <div className="handle">Drag from here</div>
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
      </Draggable>
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