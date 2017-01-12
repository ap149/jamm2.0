import Meteor, { createContainer, MeteorComplexListView } from 'react-native-meteor';
import KeyboardSpacer from 'react-native-keyboard-spacer';
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
import * as _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { pushMessage, resetEventInfo, setStatusLoading } from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colours, Fonts } from '../styles';
import { Border } from '../common';
import { Shadow } from '../common';
import ChatView from '../chatView/ChatView';
import * as EventWizHelpers from './EventWizHelpers';
import { EventStatus } from './EventStatus';
import NavBar  from '../navBar/NavBar';
import EventWizNavBar from './EventWizNavBar';
import Name from './Name';
import ChangeInfo from './ChangeInfo';
import SelectInvites from './SelectInvites';
import ChatInfoItem from '../chatView/ChatInfoItem'
import SelectedInvites from './SelectedInvites';
import SelectedDates from './SelectedDates';
import Location from './Location';
import NewGroupName from './NewGroupName';
import NewGroupSettings from './NewGroupSettings';
import PromptDates from './PromptDates';
import PromptLocation from './PromptLocation';
import Ready from './Ready';
import { ChatInputEmpty } from '../chatInput/ChatInputEmpty';
import ChatBubble from '../chatView/ChatBubble';

let botMessage = {
  type: 'text',
  fromType: 'bot',
  fromObj: {userId: null},
  body: ''
}

class EventWiz extends Component {
  constructor(props) {
    super(props);
    // EventWizHandlers.launch();
    // Meteor.call('initEventWiz');
    this.state = {
      inputValue: '',
      contacts: props.contacts
    }
  }

  componentWillMount(){
    const firstName = this.props.displayName.split(' ')[0]; 
    this.props.pushMessage(EventWizHelpers.initMsg(firstName));
  }

  componentWillUpdate(){
    LayoutAnimation.spring();
  }

  changeContacts(){
    Actions.chooseContacts();
  }


  renderSelectedInvites(){
    // if (contacts.length === 0) return <View/>
    // const {
    //   infoContainer,
    //   iconContainer
    // } = styles;
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
          <NewGroupName 
            passedData={this.state.contacts}
          />
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
          <Ready addMessage/>
        ) 
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
  },

  iconContainer: {
    width: 40,
    minHeight: 40,
    padding: 14,
    borderWidth: 1,
    borderColor: 'green'
  }
}

const mapStateToProps = (state) => {
  const { userId, displayName, phoneNumber } = state.user;
  const { status, messages, eventName, newGroupName } = state.eventInfo;
  return { userId, displayName, status, messages, eventName, newGroupName };
};

export default connect(mapStateToProps, { pushMessage, resetEventInfo, setStatusLoading })(EventWiz);