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
      console.log("go to group settings");
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
    if (this.props.contacts.length < 1) {
      return <View/>
    }
    const {
      infoContainer,
      iconContainer,
      inviteInfoContainer,
      itemTextButton,
      textButtonText
    } = styles;
    const _this = this;
    return (
      <ChatInfoItem
        iconName={this.props.contacts.length === 1 ? 'user' : 'users'}
        buttonArrow
        onPress={this.onPress.bind(this)}
      >
        {this.renderSelectedInfo()}
      </ChatInfoItem>
      // <View>
      //   <View style={infoContainer}>
      //     <View style={iconContainer}>
      //       <Icon name={this.props.contacts.length === 1 ? 'user' : 'users'} size={16} color={Colours.iconShade}/>
      //     </View>
      //     <View style={inviteInfoContainer}>
      //       {this.renderSelectedInfo(this.props.contacts)}
      //     </View>
      //     <TouchableOpacity style={itemTextButton}>
      //       <Text style={textButtonText}>Change</Text>
      //     </TouchableOpacity>             
      //   </View>
      // </View>
    )
  }
}

const styles = {
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: Colours.navBarBack
  },

  iconContainer: {
    width: 40,
    minHeight: 40,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  inviteInfoContainer: {
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    flex: 1
  },

  itemTextButton: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    justifyContent: 'center'
  },

  textButtonText: {
    color: Colours.app
  }
}

const mapStateToProps = (state) => {
  const { contacts, contactObjs, newGroupName } = state.eventInfo;
  return { contacts, contactObjs, newGroupName };
};

export default connect(mapStateToProps, { })(SelectedInvites);
