import React, { Component } from 'react';
import Draggable from 'react-draggable';

class ChatBox extends Component {
  state = {  }

  render() {
    return (
      <div style={{backgroundColor: 'white'}}>
        <div >
          The best chat box around
        </div>
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
            </div>
          </Draggable>
        </div>
      </div>
    );
  }
}

export default ChatBox;