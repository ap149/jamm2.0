import Meteor, { createContainer, MeteorComplexListView } from 'react-native-meteor';
import * as _ from 'lodash';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import { 
  View,
  Text, 
  ListView,
  LayoutAnimation
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import EventDetailNavBar  from './EventDetailNavBar';
import { Border } from '../common';
import { Shadow } from '../common';
import ChatView from '../chatView/ChatView';
import ChatBubble from '../chatView/ChatBubble';
import { ChatInputEmpty } from '../chatInput/ChatInputEmpty';

import Invites from './Invites';
import Dates from './Dates';
import Location from './Location';
import MessageInput from './MessageInput';

class EventDetail extends Component {
  constructor(){
    super();
    this.state = {
      showInfo: true
    }
  }

  componentWillUpdate(){
    LayoutAnimation.spring();
  }

  getDataSource(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(this.props.eventItem.messages);    
  }

  toggleInfo(){
    this.setState({showInfo: !this.state.showInfo});
  }

  renderInputContainer(){
    return (
      <MessageInput />
    )
  }

  renderInfo(){
    if (this.state.showInfo){
      return (
        <View>
          <Invites users={this.props.eventItem.users} />
          <Dates dateOptions={this.props.eventItem.dateOptions} />
          <Location location={this.props.eventItem.location} />      
        </View>
      )
    }
    return <View/>
  }

  render(){
    const {
      eventName,
      arrangedBy,
      iconName,
      imgUrl
    } = this.props.eventItem

    return (
      <View style={{flex: 1}}>
        <EventDetailNavBar 
          eventName={eventName}
          arrangedBy={arrangedBy}
          iconName={iconName}
          imgUrl={imgUrl}
          toggleInfo={this.toggleInfo.bind(this)}
        />
        {this.renderInfo()}
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

const EventDetailConnected = createContainer((props)=>{
  Meteor.subscribe('events');
  return {
    eventItem: Meteor.collection('events').findOne({'_id':props.eventId}),
  };
}, EventDetail)

// const mapStateToProps = (state) => {
//   const { eventObject } = state.evenInfo;
//   return { eventInfo };
// };

export default connect(null, { })(EventDetailConnected);