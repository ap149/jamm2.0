import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { ChatOptionContainer } from '../chatInput/ChatOptionContainer'
import ChatOption from '../chatInput/ChatOption'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class SelectInvites extends Component {

  chooseContacts(){
    Actions.chooseContacts();
  }

  render(){
    console.log(this.props.status);
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
  const { status } = state.newEventInfo;

  return { status };
};

export default connect(mapStateToProps, {  })(SelectInvites);