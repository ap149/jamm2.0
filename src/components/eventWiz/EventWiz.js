
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
import NavBar  from '../navBar/NavBar';
import ChatView from '../chatView/ChatView';
import { Border } from '../common';
import * as EventWizHelpers from './EventWizHelpers';
import EventWizNavBar from './EventWizNavBar';
import EventName from './EventName';
import EventImage from './EventImage';
import EventInvites from './EventInvites';
import EventInvitees from '../eventInfo/EventInvitees';
import EventNewGroupName from './EventNewGroupName';
import EventInfo from '../eventInfo/EventInfo';
import { ChatInputEmpty } from '../chatInput/ChatInputEmpty';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

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

  // passChatData(){
  //   let data = [];
  //   if (this.props.eventWiz){
  //     data = this.props.eventWiz.messages || [];
  //   }
  //   return data;
  // }

  onSkip(){
    Actions.refresh();
    // this.props.setStatusLoading();
  }

  renderInputContainer(){
    // if (!this.props.eventWiz){
    //   return (<View />);
    // }
    switch (this.props.status){
      case 'init':
        return (
          <EventName />
        );
      case 'eventImage':
        return (
          <EventImage />
        ) 
      case 'chooseInvites':
        return (
          <EventInvites />
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

  renderTest(){
    return (
      <Text>
        {this.props.messages.length} messages
      </Text>      
    )
  }

  getDataSource(){
    // let data = this.props.messages || this.state.dataSource;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(this.props.messages);    
  }

  render() {
    const { 
      outerContainer,
      chatPadding,
      chatContainer,
      inputContainer
    } = styles;

    return (

        <View style={outerContainer}>
          <EventWizNavBar />
          {this.renderTest()}
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

  chatPadding: {
    flex: 1
  },

  chatContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    borderColor: 'green',
    borderWidth: 3
  },

  inputContainer: {
    // minHeight: 42,
    // flex: 1,
    borderColor: 'green',
    borderWidth: 2    
  },

  textInput: {
    margin: 10,
    paddingLeft: 10,
    fontSize: 17,
    lineHeight: 35,
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 4
  },  
}

// const EventWizConnected = createContainer(params=>{
//   Meteor.subscribe('eventWiz');
//   return {
//     eventWiz: Meteor.collection('eventWiz').findOne({})
//   };
// }, EventWiz)

const mapStateToProps = (state) => {
  const { userId, displayName, phoneNumber } = state.user;
  const { status, messages, eventName, contacts } = state.eventInfo;
  return { userId, displayName, status, messages, eventName, contacts };
};

export default connect(mapStateToProps, { pushMessage, resetEventInfo, setStatusLoading })(EventWiz);