import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { EventInfoItem } from './EventInfoItem';
import { View } from 'react-native';

class EventInvitees extends Component {
  render(){
    return (
      <Text>
        {this.props.contacts.length} people invited
      </Text>
    );
  }
}

// const mapStateToProps = (state) => {
//   const { contacts } = state.eventInfo;
//   return { contacts };
// };

export default connect(null, { })(EventInvitees);