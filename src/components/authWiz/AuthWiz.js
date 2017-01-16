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
  ScrollView,
  View, 
  ListView,
  Text, 
  TextInput,
  TouchableOpacity,
  Button,
  LayoutAnimation
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Border } from '../common';
import { Shadow } from '../common';
import NavBar  from '../navBar/NavBar';
import ChatView from '../chatView/ChatView';
import ChatBubble from '../chatView/ChatBubble';
import { ChatInputEmpty } from '../chatInput/ChatInputEmpty';

import Banner from './Banner';
import EnterPhone from './EnterPhone';
import EnterCode from './EnterCode';
import EnterName from './EnterName';
import Complete from './Complete';

class AuthWiz extends Component{

  componentDidMount(){
    Helpers.delayDefault()
    .then(()=> {
      this.props.pushAuthMessage(ChatHelpers.createBotMessage(AuthWizHelpers.MESSAGE.INIT_MESSAGE));
      this.props.updateAuthStatus(AuthWizHelpers.STATUS.INIT)
    })
  }

  getDataSource(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(this.props.messages);    
  }

  renderInputContainer(){
    switch (this.props.status){
      case AuthWizHelpers.STATUS.INIT:
        return (
          <EnterPhone />
        );      
      case AuthWizHelpers.STATUS.ENTER_CODE:
        return (
          <EnterCode />
        );      
      case AuthWizHelpers.STATUS.ENTER_NAME:
        return (
          <EnterName />
        );      
      case AuthWizHelpers.STATUS.COMPLETE:
        return (
          <Complete />
        );      
      default:
        return (
          <ChatInputEmpty></ChatInputEmpty>
        )
    }
  }

  renderWaiting(){
    if (this.props.status) return <View/>;
    return (
      <ChatBubble 
        typing
      />
    )    
  }

  render(){
    return (
      <View style={{flex: 1}}>

        <Banner />
        <Shadow />  
        <ChatView 
          chatData={this.getDataSource()}
        />
        {this.renderWaiting()}
        <Border />
        {this.renderInputContainer()}
        <KeyboardSpacer/>
      </View>    
    )
  }

}

const mapStateToProps = (state) => {
  const { status, messages } = state.auth;
  return { status, messages };
};

export default connect(mapStateToProps, { updateAuthStatus, pushAuthMessage })(AuthWiz);