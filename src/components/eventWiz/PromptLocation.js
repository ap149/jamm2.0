import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as Helpers from '../common/Helpers';
import * as EventWizHelpers from './EventWizHelpers';
import { EventStatus } from '../eventWiz/EventStatus';
import { updateStatus, pushMessage, setLocation } from '../../actions';
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

  handleNext(location){
    this.props.updateStatus(false);
    Helpers.delayDefault()
    .then(() => {
      this.props.setLocation(location);      
      return Helpers.delayDefault()
    })
    .then(() => {
      this.props.pushMessage(EventWizHelpers.createBotMessage(EventWizHelpers.msg.READY_ADD_MESSAGE));
      this.props.updateStatus(EventStatus.READY_ADD_MESSAGE);
    })
  
    // Helpers.delayLong()
    // .then(() => {  

    // });  
  }

  onSend(){
    this.handleNext(this.state.inputText);
  }

  skip(){
    this.handleNext(null);
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

export default connect(null, { updateStatus, pushMessage, setLocation })(PromptLocation)