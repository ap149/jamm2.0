import Meteor, { createContainer, MeteorComplexListView } from 'react-native-meteor';
import * as _ from 'lodash';

import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { updateAuthStatus, pushAuthMessage } from '../../actions';

import * as Helpers from '../common/Helpers';
import * as AuthWizHelpers from './AuthWizHelpers';
import * as ChatHelpers from '../chatView/ChatHelpers';

import React, { Component } from 'react';
import { 
  View, 
} from 'react-native';

import { ChatOptionContainer } from '../chatInput/ChatOptionContainer'
import ChatInput from '../chatInput/ChatInput'
import ChatOption from '../chatInput/ChatOption'

class EnterCode extends Component {
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
    this.props.updateAuthStatus(false);
    Meteor.call('updateName', this.state.inputText, this.props.appVersion, this.props.userStatus, (err, res) => {
      if (res){
        this.props.pushAuthMessage(ChatHelpers.createBotMessage(AuthWizHelpers.MESSAGE.COMPLETE));
        this.props.updateAuthStatus(AuthWizHelpers.STATUS.COMPLETE);
      } else {
        console.log("handle error");
      }
    });    
  }

  render(){
    return (
      <View>
        <ChatInput
          placeholder="Enter your name..."
          autoCapitalize={true}
          icon="arrow-circle-right"
          value={this.state.inputText}
          onChangeText={this.onEnterText.bind(this)}
          onSend={this.onSend.bind(this)}
          disabled={this.state.inputText === ''}
        />
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  const { appVersion, userStatus, status, country, phonenumber } = state.auth;

  return { appVersion, userStatus, status, country, phonenumber };
};

export default connect(mapStateToProps, { updateAuthStatus, pushAuthMessage })(EnterCode);