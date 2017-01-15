import Meteor, { createContainer, MeteorComplexListView } from 'react-native-meteor';
import * as _ from 'lodash';

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
    Meteor.call('verifyCode', this.props.phoneNumber, this.props.countryCode, code,(err, res) => {
      this.setState({checkingCode: false});
      if (err){
        console.log(err);
        this.resetState();
      } else {
        console.log(res);
        const obj = {
          username: this.props.countryCode + this.props.phoneNumber,
          password: res
        };
        console.log(obj);
        store.save('jammUser', obj)
        .then(() => store.get('jammUser'))
        .then(userObj => {
          const pwd = userObj.password;
          Meteor.Accounts.createUser(userObj, (err) => {
            if (err){
              console.log(err);
            } else {
              Meteor.loginWithPassword(userObj.username, pwd, (err) => {
                if (!err){
                  this.props.createUser(Meteor.user());
                  Actions.profile({type: 'reset'});
                }
              })
            }
          })
        })
      }
  }

  render(){
    return (
      <View>
        <ChatInput
          placeholder="Enter 4-digit code..."
          autoCapitalize={true}
          icon="arrow-circle-right"
          value={this.state.inputText}
          onChangeText={this.onEnterText.bind(this)}
          onSend={this.onSend.bind(this)}
          disabled={this.state.inputText === ''}
          numeric
        />
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  const { status, country, phonenumber } = state.auth;

  return { status, country, phonenumber };
};

export default connect(null, {  })(EnterCode);