import Meteor from 'react-native-meteor';
import React, { Component } from 'react';
import { TouchableOpacity, LayoutAnimation, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ChatInfoItem from '../chatView/ChatInfoItem'
import { Border } from '../common';
import { Colours, Fonts } from '../styles';

class Location extends Component {

  componentWillUpdate(){
    LayoutAnimation.spring();
  }

  onPress(){
    console.log('pressed');
  }

  render(){
    return (
      <ChatInfoItem
        iconName='map-marker'
        buttonArrow
        onPress={this.onPress.bind(this)}
      >
        {this.props.location ?
          <Text style={Fonts.chatInfoHeader}>{this.props.location}</Text>
          :
          <Text style={Fonts.chatInfoSubheader}>Location TBC</Text>
        }
      </ChatInfoItem>
    )
  }
}

export default Location;
