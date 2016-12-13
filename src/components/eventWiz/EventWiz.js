
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
import Meteor, { createContainer, MeteorComplexListView } from 'react-native-meteor';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { pushMessage, resetEventInfo, setStatusLoading } from '../../actions';
import ChatView from '../chatView/ChatView';
import { Border } from '../common';
import * as EventWizHelpers from './EventWizHelpers';
import { EventStatus } from './EventStatus';
import EventWizNavBar from './EventWizNavBar';
import EventName from './EventName';
import Image from './Image';
import Invites from './Invites';
import EventInvitees from '../eventInfo/EventInvitees';
import EventNewGroupName from './EventNewGroupName';
import EventInfo from '../eventInfo/EventInfo';
import { ChatInputEmpty } from '../chatInput/ChatInputEmpty';

let botMessage = {
  type: 'text',
  fromType: 'bot',
  fromObj: {userId: null},
  body: ''
}

class EventWiz extends Component {
  constructor(props) {
    super();
    // EventWizHandlers.launch();
    // Meteor.call('initEventWiz');
    this.state = {
      inputValue: '',
      contacts: props.contacts
    }
  }

  componentWillMount(){
    const firstName = this.props.displayName.split(' ')[0];
    // const msg = 
    this.props.pushMessage(EventWizHelpers.initMsg(firstName));
    // botMessage.body = "Hi ${firstName} - let's set up an event. First, please enter the name for";
    // this.props.pushMessage(botMessage);
  }

  onSkip(){
    Actions.refresh();
  }

  renderInputContainer(){
    switch (this.props.status){
      case EventStatus.INIT:
        return (
          <EventName />
        );
      case EventStatus.IMAGE:
        return (
          <Image />
        ) 
      case EventStatus.INVITES:
        return (
          <Invites />
        ) 
      case 'newGroupName':
        return (
          <EventNewGroupName 
            passedData={this.state.contacts}
          />
        ) 
      default:
        return (
          <ChatInputEmpty></ChatInputEmpty>
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
  }
}

const mapStateToProps = (state) => {
  const { userId, displayName, phoneNumber } = state.user;
  const { status, messages, eventName, contacts } = state.eventInfo;
  return { userId, displayName, status, messages, eventName, contacts };
};

export default connect(mapStateToProps, { pushMessage, resetEventInfo, setStatusLoading })(EventWiz);