import React, { Component } from 'react';
import { TouchableOpacity, LayoutAnimation, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ChatInfoItem from '../chatView/ChatInfoItem'
import { Border } from '../common';
import { Colours, Fonts } from '../styles';

class SelectedInvites extends Component {

  componentWillUpdate(){
    LayoutAnimation.spring();
  }

  onPress(){
    if (this.props.newGroupName){
      Actions.groupSettings({init: false, groupNameInput: this.props.newGroupName});
    } else {
      Actions.chooseContacts();
    }
  }

  renderSelectedInfo(){
    if (this.props.contacts.length == 1){
      return (
        <Text style={Fonts.chatInfoHeader}>{this.props.contactObjs[0].displayName}</Text>
      )
    }
    if (!this.props.newGroupName){
      return (
        <Text style={Fonts.chatInfoHeader}>{this.props.contacts.length} people invited</Text>
      )
    }
    if ((this.props.contacts.length > 1) && this.props.newGroupName){
      return (
        <View>
          <Text style={Fonts.chatInfoHeader}>{this.props.newGroupName}</Text>
          <Text style={Fonts.chatInfoSubheader}>You plus {this.props.contacts.length} others</Text>
        </View>
      )      
    }
  }

  render(){
    if (!this.props.contactsSelected) {
      return <View/>
    }

    return (
      <ChatInfoItem
        iconName={this.props.contacts.length === 1 ? 'user' : 'user'}
        buttonArrow
        onPress={this.onPress.bind(this)}
      >
        {this.renderSelectedInfo()}
      </ChatInfoItem>
    )
  }
}

const mapStateToProps = (state) => {
  const { contacts, contactObjs, newGroupName, contactsSelected } = state.newEventInfo;
  return { contacts, contactObjs, newGroupName, contactsSelected };
};

export default connect(mapStateToProps, { })(SelectedInvites);
