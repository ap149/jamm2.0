import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { updateStatus } from '../../actions';
import { Actions } from 'react-native-router-flux';
import * as EventWizHelpers from './EventWizHelpers';
import { EventStatus } from './EventStatus';
import { ChatOptionContainer } from '../chatInput/ChatOptionContainer'
import ChatOption from '../chatInput/ChatOption'

class NewGroupSettings extends Component {
  gotoGroupSettings(){
    console.log("group settings");
    // this.props.addIcon('glass');
    // EventWizMethods.promptChooseInvites(true);    
  }

  launchDatePicker(){
    Actions.calendarPicker();
  }  

  render(){
    return (
      <ChatOptionContainer>
        <ChatOption
          label="Group settings"
          icon="sliders"
          onPress={this.gotoGroupSettings.bind(this)}
        />
        <ChatOption
          label="Choose dates"
          icon="calendar"
          onPress={this.launchDatePicker.bind(this)}
        />
      </ChatOptionContainer>
    );
  }
};

export default connect(null, { updateStatus })(NewGroupSettings);