import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { ChatOptionContainer } from '../chatInput/ChatOptionContainer'
import ChatOption from '../chatInput/ChatOption'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class EventInvites extends Component {

  chooseContacts(){
    Actions.chooseContacts();
  }

  render(){
    return (
      <ChatOptionContainer>
        <ChatOption
          label="Choose from contacts"
          icon="user-plus"
          onPress={this.chooseContacts.bind(this)}
        />
        <ChatOption
          label="Choose an existing group"
          icon="users"
        />
      </ChatOptionContainer>
    );
  }
};

const mapStateToProps = (state) => {
  const { imgUrl, iconName } = state.eventInfo;

  return { imgUrl };
};

export default connect(mapStateToProps, {  })(EventInvites);