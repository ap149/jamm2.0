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


class EventDetail extends Component {
  render(){
    return (
      <View>
        <EventDetailNavBar eventId={this.props.eventId}/>
        <Text>event detail</Text>
        <Text>{this.props.eventId}</Text>
        <Text>{this.props.eventItem.eventName}</Text>
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

export default connect(null, { })(EventDetailConnected);