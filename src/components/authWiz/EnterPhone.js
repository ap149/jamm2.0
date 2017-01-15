import Meteor, { createContainer, MeteorComplexListView } from 'react-native-meteor';
import * as _ from 'lodash';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { updateAuthStatus, pushAuthMessage, enterPhonenumber } from '../../actions';

import * as Helpers from '../common/Helpers';
import * as AuthWizHelpers from './AuthWizHelpers';
import * as ChatHelpers from '../chatView/ChatHelpers';

import React, { Component } from 'react';
import { 
  View 
} from 'react-native';

import { ChatOptionContainer } from '../chatInput/ChatOptionContainer'
import ChatInput from '../chatInput/ChatInput'
import ChatOption from '../chatInput/ChatOption'

class EnterNumber extends Component {
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
    console.log(msg1);
    this.props.updateAuthStatus(false);   
    this 
    Meteor.call('sendVerificationCode', this.state.inputText, this.props.country.countryCode, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
        console.log(res);
        Helpers.delayDefault().
        then(() => {
          this.props.pushAuthMessage(ChatHelpers.createBotMessage(AuthWizHelpers.msgSentCode(this.props.country.countryCode + this.state.inputText)));
          this.props.updateAuthStatus(AuthWizHelpers.STATUS.ENTER_CODE);        
        }) 
      }
    })
  }

  chooseCountry(){
    Actions.chooseCountry()
  }  

  render(){
    return (
      <View>
        <ChatInput
          placeholder="Enter your phone number..."
          autoCapitalize={true}
          icon="arrow-circle-right"
          value={this.state.inputText}
          onChangeText={this.onEnterText.bind(this)}
          onSend={this.onSend.bind(this)}
          disabled={this.state.inputText === ''}
          numeric
          leftLabel="UK: +44(0)"
        />
        <ChatOptionContainer>
          <ChatOption
            label="Change country code"
            icon="flag"
            onPress={this.chooseCountry.bind(this)}
          />
        </ChatOptionContainer>
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  const { status, country } = state.auth;

  return { status, country };
};

export default connect(mapStateToProps, { updateAuthStatus, pushAuthMessage, enterPhonenumber })(EnterNumber);