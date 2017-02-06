import Meteor from 'react-native-meteor';
import React, { Component } from 'react';
import { TouchableOpacity, LayoutAnimation, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ChatInfoItem from '../chatView/ChatInfoItem'
import { Border } from '../common';
import { Colours, Fonts } from '../styles';

class Invites extends Component {

  componentWillUpdate(){
    LayoutAnimation.spring();
  }

  onPress(){
    console.log('pressed');
  }

  renderSelectedInfo(){
    let users = this.props.users;
    if (users.length == 2){
      let name;
      if (users[0].userId == Meteor.userId()){
        name = users[1].displayName;
      } else {
        name = users[0].displayName;
      }
      return (
        <Text style={Fonts.chatInfoHeader}>{name}</Text>
      )
    }
    return (
      <Text style={Fonts.chatInfoHeader}>You plus {users.length - 1} others</Text>
    )
  }

  render(){

    return (
      <ChatInfoItem
        iconName='user'
        buttonArrow
        onPress={this.onPress.bind(this)}
      >
        {this.renderSelectedInfo()}
      </ChatInfoItem>
    )
  }
}

export default Invites;
