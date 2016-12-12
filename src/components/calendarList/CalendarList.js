import React, { Component } from 'react';
import { 
  View, 
  ScrollView,
  Text, 
  TouchableOpacity,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Meteor, { createContainer } from 'react-native-meteor';
import store from 'react-native-simple-store';
import { loadUser } from '../../actions';
import NavBar  from '../navBar/NavBar';
import { Colours } from '../styles';

// const offline = true;

class CalendarList extends Component {
  constructor(props) {
    super();
  }


  render() {
    // this._loadUser();
    const { 
      outerContainer
    } = styles;

    return (
      <View style={outerContainer}>
        <NavBar
          sideMenuButton={false}
          backButton={true}
        />
        <Text>calendar list</Text>
      </View>
    )
  }
}

const styles = {
  outerContainer: {
    flex: 1
  }
}

// const mapStateToProps = (state) => {
//   const { userId, displayName, phoneNumber } = state.user;

//   return { userId, displayName, phoneNumber };
// };

// const EventListConnected = createContainer(params=>{
//   // Meteor.subscribe('items');
//   return {
//     // eventList: Meteor.collection('items').find(),
//     // meteorUser: Meteor.user(),
//     status: Meteor.status()
//   };
// }, EventList)

export default CalendarList;