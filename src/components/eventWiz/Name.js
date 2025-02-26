import React, { Component } from 'react';
import { TextInput, View, Text, Keyboard } from 'react-native';
import ChatInput from '../chatInput/ChatInput'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { updateEventName, changeIcon, updateStatus } from '../../actions';
import { pushMessage } from '../../actions';
import * as Helpers from '../common/Helpers';
import * as EventWizHelpers from './EventWizHelpers';
import { EventStatus } from './EventStatus';

class Name extends Component {
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
    const eventName = this.state.inputText;
    let msg1, msg2;    
    this.props.updateStatus(false);    
    msg1 = EventWizHelpers.createUserMessage(this.props.userId, eventName);      
    this.props.pushMessage(msg1);        
    this.props.updateEventName({eventName: eventName, arrangedBy: this.props.displayName});
    this.props.changeIcon('calendar-o');      
    const _this = this;
    Helpers.delayDefault()
    .then(() => {
      msg2 = EventWizHelpers.createBotMessage(EventWizHelpers.msg.PROMPT_CONTACTS);
      _this.props.pushMessage(msg2);
      _this.props.updateStatus(EventStatus.INVITES);      
      Keyboard.dismiss();
    })
  }

  render(){
    const { containerStyle } = styles;

    return (
      <ChatInput
        placeholder="e.g. Dinner, Birthday Drinks, Coffee..."
        autoCapitalize={true}
        autoFocus
        icon="arrow-circle-right"
        value={this.state.inputText}
        onChangeText={this.onEnterText.bind(this)}
        onSend={this.onSend.bind(this)}
        disabled={this.state.inputText === ''}
        singleLine={true}
      />
    );
  }
};

const styles = {
  containerStyle: {

  }
};

const mapStateToProps = (state) => {
  const { userId, displayName } = state.user;

  return { userId, displayName };
};

export default connect(mapStateToProps, { updateEventName, changeIcon, updateStatus, pushMessage})(Name);