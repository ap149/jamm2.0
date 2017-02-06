import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { ChatOptionContainer } from '../chatInput/ChatOptionContainer';
import ChatInput from '../chatInput/ChatInput';

class MessageInput extends Component {
  constructor(){
    super();
    this.state = {
      inputText: ''
    }
  }

  onEnterText(inputText){
    this.setState({inputText})
  }

  onSend(){
    console.log(this.state.inputText);
  }

  render(){
    return (
      <ChatInput
        placeholder="Write a message..."
        autoCapitalize={true}
        icon="arrow-circle-right"
        value={this.state.inputText}
        onChangeText={this.onEnterText.bind(this)}
        onSend={this.onSend.bind(this)}
        disabled={this.state.inputText === ''}
      /> 
    );
  }
};

export default MessageInput;