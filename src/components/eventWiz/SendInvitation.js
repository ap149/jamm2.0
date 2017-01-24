import Meteor from 'react-native-meteor';
import moment from 'moment';
import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as Helpers from '../common/Helpers';
import * as ChatHelpers from '../chatView/ChatHelpers';
import * as EventWizHelpers from './EventWizHelpers';
import { EventStatus } from '../eventWiz/EventStatus';
import { updateStatus, setLocation, pushMessage, invitationMessage } from '../../actions';
import { ChatOptionContainer } from '../chatInput/ChatOptionContainer'
import ChatInput from '../chatInput/ChatInput'
import ChatOption from '../chatInput/ChatOption'

class SendInvitation extends Component {
  constructor(){
    super();
    this.state = {
      inputText: ''
    }
  }

  onEnterText(inputText){
    this.setState({inputText})
  }

  addMessage(){
    const msgObj = ChatHelpers.createUserMessage(this.props.userObj,this.state.inputText);
    console.log(msgObj);
    this.props.pushMessage(msgObj);
    this.props.invitationMessage(msgObj);
    this.setState({inputText: ''});
  }

  prepareDates(dates){
    let dateOptionsArray = [];
    for (i=0; i<dates.length; i++){
      let dateObj = {};
      // dateObj.date = moment();
      dateObj.index = i;
      dateObj.date = moment().add(dates[i].daysFromToday, 'days').startOf('day').toISOString();
      dateObj.startTime = dates[i].startTime ? moment(dates[i].startTime, "h:mm A").toISOString() : null;
      dateObj.endTime = dates[i].endTime ? moment(dates[i].endTime, "h:mm A").toISOString() : null;
      dateObj.available = [this.props.userObj];
      dateOptionsArray.push(dateObj);
    }
    console.log(dateOptionsArray);
    return dateOptionsArray;
  }

  prepareContacts(contacts){
    let contactsArray = [];
    for (i=0; i < contacts.length; i++){
      let contactObj = {};
      contactObj.userId = false;
      contactObj.displayName = contacts[i].displayName;
      contactObj.phoneNumber = Helpers.cleanPhoneNumber(contacts[i].phoneNumber);
      contactsArray.push(contactObj);
    }
    contactsArray.push(this.props.userObj);
    return contactsArray;
  }

  prepareInvitation(){
    // this.props.updateStatus(EventStatus.SENDING);

    if (this.state.inputText != '' && !this.props.invitationMessageAdded){
      const msgObj = ChatHelpers.createUserMessage(Meteor.userId(),this.state.inputText);      
      this.props.invitationMessage(msgObj);      
    }

    let
      // arrangedBy = this.props.arrangedBy,
      // eventName = this.props.eventName,
      // imgUrl = this.props.imgUrl,
      // iconName = this.props.iconName,
      dates = this.props.dates, 
      // location = this.props.location,
      // invitationMessage = this.props.eventMessages,    
      // invitationMessageAdded = this.props.invitationMessageAdded,    
      contactObjs = this.props.contactObjs;
      // newGroupName = this.props.newGroupName;

    const dateOptions = this.prepareDates(dates);
    const users = this.prepareContacts(contactObjs);

    let invitationObj = {
      created: new Date(),
      updated: new Date(),
      readyBy: [this.props.userObj.userId],
      arrangedBy: this.props.arrangedBy,
      eventName: this.props.eventName,
      imgUrl: this.props.imgUrl,
      iconName: this.props.iconName,
      dateOptions: dateOptions,
      eventConfirmed: false,
      location: this.props.location,
      messages: this.props.eventMessages,    
      users: users,
      groupName: this.props.newGroupName,
    }

    this.sendInvitation(invitationObj);
  }

  sendInvitation(invitationObj){
    Meteor.call('createNewEvent', invitationObj);
    Actions.pop()
  }

  render(){
    return (
      <View>
        <ChatInput
          placeholder={this.props.invitationMessageAdded ? 'Change message' : 'Add message (optional)...'}
          autoCapitalize={true}
          icon="arrow-circle-right"
          value={this.state.inputText}
          onChangeText={this.onEnterText.bind(this)}
          onSend={this.addMessage.bind(this)}
          disabled={this.state.inputText === ''}
        />
        <ChatOptionContainer>
          <ChatOption
            label="Send invitation"
            icon="paper-plane"
            onPress={this.prepareInvitation.bind(this)}
          />
        </ChatOptionContainer>
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  const { 
    arrangedBy,
    eventName,
    imgUrl,
    iconName,
    status,
    contacts,
    contactObjs,
    contactsSelected,
    newGroupName,
    dates,
    datesSelected,
    location,
    locationSelected,
    eventMessages,
    invitationMessageAdded,
  } = state.newEventInfo;
  const { userObj } = state.user;

  return { 
    arrangedBy,
    eventName,
    imgUrl,
    iconName,
    status,
    contacts,
    contactObjs,
    contactsSelected,
    newGroupName,
    dates,
    datesSelected,
    location,
    locationSelected,
    eventMessages,    
    invitationMessageAdded,
    userObj
  };
};

export default connect(mapStateToProps, { updateStatus, pushMessage, invitationMessage })(SendInvitation)