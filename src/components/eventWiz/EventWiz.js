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
import ChatView from '../chatView/ChatView';
import * as EventWizHelpers from './EventWizHelpers';
import { EventStatus } from './EventStatus';
import EventWizNavBar from './EventWizNavBar';
import Name from './Name';
import SelectImage from './SelectImage';
import SelectInvites from './SelectInvites';
import ChatInfoItem from '../chatView/ChatInfoItem'
import SelectedInvites from './SelectedInvites';
import NewGroupName from './NewGroupName';
import NewGroupSettings from './NewGroupSettings';
import PromptDates from './PromptDates';
import { ChatInputEmpty } from '../chatInput/ChatInputEmpty';

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
      case EventStatus.IMAGE:
        return (
          <SelectImage />
        ) 
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
      default:
        console.log(this.props.status);
        return (
          <ChatInputEmpty loading></ChatInputEmpty>
        )
    }
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
          <EventWizNavBar />
          <SelectedInvites />
          <Border shadow/>          
          <ChatView 
            chatData={this.getDataSource()}
          />
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