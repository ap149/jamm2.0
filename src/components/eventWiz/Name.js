import React, { Component } from 'react';
import { TextInput, View, Text, Keyboard } from 'react-native';
import ChatInput from '../chatInput/ChatInput'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { updateEventName, addIcon, updateStatus } from '../../actions';
import { pushMessage } from '../../actions';
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
    this.props.updateEventName({eventName: eventName, arrangedBy: this.props.displayName});
    this.props.addIcon('calendar-o');
    this.props.updateStatus(EventStatus.IMAGE);
    msg1 = Object.assign({},EventWizHelpers.createUserMessage(this.props.userId, eventName));
    this.props.pushMessage(msg1);
    msg2 = Object.assign({}, EventWizHelpers.createBotMessage(EventWizHelpers.chooseImageMessage(eventName)));
    this.props.pushMessage(msg2);
    Keyboard.dismiss();
  }

  render(){
    const { containerStyle } = styles;

    return (
      <ChatInput
        placeholder="e.g. Dinner, Birthday Drinks, Coffee..."
        autoCapitalize={true}
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

export default connect(mapStateToProps, { updateEventName, addIcon, updateStatus, pushMessage})(Name);