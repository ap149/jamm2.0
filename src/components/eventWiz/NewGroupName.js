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
    const groupNameMsg = EventWizHelpers.createUserMessage(this.props.userId, `Group saved as '${this.state.inputText}'`);
    // this.props.pushMessage(msg);
    // }, EventWizHelpers.CHATBOT_DELAY);    
    this.props.updateNewGroupName(this.state.inputText);
    Keyboard.dismiss();
    this.props.updateStatus(false);
    const _this = this;
    setTimeout(function() {
      _this.props.updateStatus(EventStatus.PROMPT_DATES);      
    }, EventWizHelpers.CHATBOT_DELAY);
  }

  skip(){
    console.log(this.props.passedData);
  }

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
            label="Skip"
            onPress={this.skip.bind(this)}
          />
        </ChatOptionContainer>
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  const { userId } = state.user;
  const { contacts } = state.eventInfo;

  return { contacts };
};

export default connect(mapStateToProps, { updateNewGroupName, updateStatus, pushMessage })(EventNewGroupName);