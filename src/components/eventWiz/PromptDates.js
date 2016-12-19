import { connect } from 'react-redux';
import { updateNewGroupName, updateStatus, pushMessage } from '../../actions';
import React, { Component } from 'react';
import { View } from 'react-native';
import { ChatOptionContainer } from '../chatInput/ChatOptionContainer'
import ChatOption from '../chatInput/ChatOption'
import * as EventWizHelpers from './EventWizHelpers';
import { EventStatus } from './EventStatus';

class PromptDates extends Component {
  componentWillMount(){
    const msg = EventWizHelpers.createBotMessage(`Do you want to choose dates and times or just dates?`);
    console.log(msg);
    this.props.pushMessage(msg);
  }

  launchDatePicker(){
    const msg = EventWizHelpers.createBotMessage(`test new msg`);
    console.log(msg);
    this.props.pushMessage(msg);
  }

  launchDatetimePicker(){
    console.log("datetime picker");
    
  }

  render(){
    return (
      <ChatOptionContainer>
        <ChatOption
          label="Dates only"
          icon="calendar"
          onPress={this.launchDatePicker.bind(this)}
        />
        <ChatOption
          label="Dates and times"
          icon="clock-o"
          onPress={this.launchDatetimePicker.bind(this)}
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