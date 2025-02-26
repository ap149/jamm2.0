import Meteor, { createContainer, MeteorComplexListView } from 'react-native-meteor';
import * as _ from 'lodash';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { pushMessage, resetEventInfo, setStatusLoading, updateStatus } from '../../actions';

import React, { Component } from 'react';
import { 
  View, 
  ListView,
  LayoutAnimation
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { Border } from '../common';
import { Shadow } from '../common';
import ChatView from '../chatView/ChatView';
import ChatBubble from '../chatView/ChatBubble';
import { ChatInputEmpty } from '../chatInput/ChatInputEmpty';

import * as EventWizHelpers from './EventWizHelpers';
import * as Helpers from '../chatView/ChatHelpers';
import { EventStatus } from './EventStatus';
import EventWizNavBar from './EventWizNavBar';

import Name from './Name';
import ChangeInfo from './ChangeInfo';
import SelectInvites from './SelectInvites';
import SelectedInvites from './SelectedInvites';
import SelectedDates from './SelectedDates';
import Location from './Location';
import NewGroupName from './NewGroupName';
import NewGroupSettings from './NewGroupSettings';
import PromptDates from './PromptDates';
import PromptLocation from './PromptLocation';
import SendInvitation from './SendInvitation';

class EventWiz extends Component {

  componentWillMount(){
    const firstName = this.props.displayName.split(' ')[0]; 
    this.props.pushMessage(Helpers.createBotMessage(EventWizHelpers.msg.INIT_1));
    this.props.pushMessage(Helpers.createBotMessage(EventWizHelpers.msg.INIT_2));
    this.props.updateStatus(EventStatus.INVITES);
  }

  componentWillUpdate(){
    LayoutAnimation.spring();
  }

  changeContacts(){
    Actions.chooseContacts();
  }

  renderSelectedInvites(){
    return (
      <SelectedInvites
        // contacts={contacts}
        newGroupName={this.props.newGroupName}
      />
    )
  };

  renderInputContainer(){
    switch (this.props.status){
      case EventStatus.INIT:
        return (
          <Name />
        );
      case EventStatus.INVITES:
        return (
          <SelectInvites />
        ) 
      case EventStatus.NEW_GROUP_NAME:
        return (
          <NewGroupName />
        ) 
      case EventStatus.NEW_GROUP_SETTINGS:
        return (
          <NewGroupSettings/>
        ) 
      case EventStatus.PROMPT_DATES:
        return (
          <PromptDates/>
        ) 
      case EventStatus.PROMPT_LOCATION:
        return (
          <PromptLocation/>
        ) 
      case EventStatus.READY_ADD_MESSAGE:
        return (
          <SendInvitation addMessage/>
        ) 
      default:
        return (
          <ChatInputEmpty></ChatInputEmpty>
        )
    }
  }

  renderWaiting(){
    if (this.props.status && (this.props.status != EventStatus.SENDING)) return <View/>;
    return (
      <ChatBubble 
        typing
      />
    )    
  }

  getDataSource(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(this.props.messages);    
  }

  render() {
    const { 
      outerContainer
    } = styles;

    return (
        <View style={outerContainer}>
          <EventWizNavBar/>
          <SelectedInvites />
          <SelectedDates />
          <Location />
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

const styles = {
  outerContainer: {
    flex: 1
  },

  infoContainer: {
    flexDirection: 'row'
  }
}

const mapStateToProps = (state) => {
  const { userId, displayName, phoneNumber } = state.user;
  const { status, messages, eventName, newGroupName } = state.newEventInfo;
  return { userId, displayName, status, messages, eventName, newGroupName };
};

export default connect(mapStateToProps, { updateStatus, pushMessage, resetEventInfo, setStatusLoading })(EventWiz);