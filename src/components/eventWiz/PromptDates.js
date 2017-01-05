import { connect } from 'react-redux';
import { updateNewGroupName, updateStatus, pushMessage } from '../../actions';
import { Actions } from 'react-native-router-flux';
import React, { Component } from 'react';
import { View } from 'react-native';
import { ChatOptionContainer } from '../chatInput/ChatOptionContainer'
import ChatOption from '../chatInput/ChatOption'
import * as EventWizHelpers from './EventWizHelpers';
import { EventStatus } from './EventStatus';

class PromptDates extends Component {
  componentWillMount(){
    const msg = EventWizHelpers.createBotMessage(EventWizHelpers.msg.PROMPT_DATES);
    console.log(msg);
    this.props.pushMessage(msg);
  }

  launchDatePicker(){
     Actions.calendarPicker();
  }

  render(){
    return (
      <ChatOptionContainer>
        <ChatOption
          label="Choose date(s)"
          icon="calendar"
          onPress={this.launchDatePicker.bind(this)}
        />
      </ChatOptionContainer>
    );
  }
};

const mapStateToProps = (state) => {
  const { userId } = state.user;

  return { userId };
};

export default connect(mapStateToProps, {pushMessage})(PromptDates)