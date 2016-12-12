import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
// import { EventInvites } from './EventInvites';

class EventInfo extends Component {

  renderInviteInfo(){
    return (
      <View>
        <Text>contacts found</Text>
      </View>
    )
  }

  render(){
    console.log("contacts passed");
    console.log(this.props.contacts)
    return (

      <View>
        {this.props.contacts.length > 0 ? this.renderInviteInfo(this.props.contacts) : <View/>}
      </View>
    )
  }
}

// const mapStateToProps = (state) => {
//   const { contacts } = state.eventInfo;
//   return { contacts };
// };

export default connect(null, { })(EventInfo);