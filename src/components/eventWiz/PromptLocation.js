import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as Helpers from '../common/Helpers';
import * as EventWizHelpers from './EventWizHelpers';
import { EventStatus } from '../eventWiz/EventStatus';
import { updateStatus, setLocation } from '../../actions';
import { ChatOptionContainer } from '../chatInput/ChatOptionContainer'
import ChatInput from '../chatInput/ChatInput'
import ChatOption from '../chatInput/ChatOption'

class PromptLocation extends Component {
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
    this.props.updateStatus(false);
    Helpers.delayShort()
    .then(() => {
      this.props.setLocation(this.state.inputText);      
      this.props.pushMessage(EventWizHelpers.createBotMessage(EventWizHelpers.msg.GROUP_SAVED));
    });    
    // setTimeout(function() {
    // const msg1 = this.state.inputText;
    // this.props.pushMessage(EventWizHelpers.createUserMessage(this.props.userId, msg1));
    // Keyboard.dismiss();
    // this.props.updateStatus(false);
    // this.props.updateNewGroupName(this.state.inputText);
    // Helpers.delayShort()
    // .then(() => {
    //   this.props.pushMessage(EventWizHelpers.createBotMessage(EventWizHelpers.msg.GROUP_SAVED));
    //   this.props.updateStatus(EventStatus.NEW_GROUP_SETTINGS);      
    // });
  }

  skip(){
    this.props.setLocation(null);
    // this.props.updateStatus(false);
  }

  render(){
    return (
      <View>
        <ChatInput
          placeholder="Enter location (optional)..."
          autoCapitalize={true}
          icon="arrow-circle-right"
          value={this.state.inputText}
          onChangeText={this.onEnterText.bind(this)}
          onSend={this.onSend.bind(this)}
          disabled={this.state.inputText === ''}
        />      
        <ChatOptionContainer>
          <ChatOption
            label="Skip"
            onPress={this.skip.bind(this)}
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

export default connect(null, { updateStatus, setLocation })(PromptLocation)