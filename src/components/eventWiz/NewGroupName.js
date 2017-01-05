import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as Helpers from '../common/Helpers';
import * as EventWizHelpers from './EventWizHelpers';
import { EventStatus } from '../eventWiz/EventStatus';
import { updateNewGroupName, updateStatus, pushMessage } from '../../actions';
import { ChatOptionContainer } from '../chatInput/ChatOptionContainer'
import ChatInput from '../chatInput/ChatInput'
import ChatOption from '../chatInput/ChatOption'

class EventNewGroupName extends Component {
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
    // setTimeout(function() {
    const msg1 = this.state.inputText;
    this.props.pushMessage(EventWizHelpers.createUserMessage(this.props.userId, msg1));
    Keyboard.dismiss();
    this.props.updateStatus(false);
    this.props.updateNewGroupName(this.state.inputText);
    Helpers.delayShort()
    .then(() => {
      // const msg2 = `Done. Everyone in this group will be able to use it to arrange other events. You are the only admin. Do you want to change any group settings or skip to choose dates?`;
      this.props.pushMessage(EventWizHelpers.createBotMessage(EventWizHelpers.msg.GROUP_SAVED));
      this.props.updateStatus(EventStatus.NEW_GROUP_SETTINGS);      
    });
  }

  launchDatePicker(){
    Actions.calendarPicker();
  }  

  // skip(){
  //   this.props.updateStatus(EventStatus.PROMPT_DATES);
  // }

  render(){
    return (
      <View>
        <ChatInput
          placeholder="Enter a name to save this group..."
          autoCapitalize={true}
          icon="arrow-circle-right"
          value={this.state.inputText}
          onChangeText={this.onEnterText.bind(this)}
          onSend={this.onSend.bind(this)}
          disabled={this.state.inputText === ''}
        />      
        <ChatOptionContainer>
          <ChatOption
            label="Choose dates"
            icon="calendar"
            onPress={this.launchDatePicker.bind(this)}
          />
        </ChatOptionContainer>
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  const { userId } = state.user;
  const { contacts } = state.eventInfo;

  return { userId, contacts };
};

export default connect(mapStateToProps, { updateNewGroupName, updateStatus, pushMessage })(EventNewGroupName);