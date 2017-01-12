import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as Helpers from '../common/Helpers';
import * as EventWizHelpers from './EventWizHelpers';
import { EventStatus } from '../eventWiz/EventStatus';
import { updateStatus, setLocation, pushMessage } from '../../actions';
import { ChatOptionContainer } from '../chatInput/ChatOptionContainer'
import ChatInput from '../chatInput/ChatInput'
import ChatOption from '../chatInput/ChatOption'

class Ready extends Component {
  constructor(){
    super();
    this.state = {
      inputText: ''
    }
  }

  addMessage(){
    console.log("add message");
  }

  sendInvitation(){
    console.log("send invitation");
  }

  render(){
    return (
      <View>

          <ChatInput
            placeholder="Add message (optional)..."
            autoCapitalize={true}
            icon="arrow-circle-right"
            value={this.state.inputText}
            onChangeText={() => this.onEnterText.bind(this)}
            onSend={() => console.log("msg")}
            disabled={this.state.inputText === ''}
          />

        <ChatOptionContainer>
          <ChatOption
            label="Send invitation"
            icon="paper-plane"
            onPress={() => this.sendInvitation.bind(this)}
          />
        </ChatOptionContainer>
      </View>
    );
  }
};

// const mapStateToProps = (state) => {
//   const { userId } = state.user;

//   return { userId };
// };

export default connect(null, { updateStatus, pushMessage, setLocation })(Ready)