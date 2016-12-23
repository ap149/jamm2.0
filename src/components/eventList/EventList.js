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
import EventListItem from './EventListItem';
import NavBar  from '../navBar/NavBar';
import { Colours } from '../styles';
import ChatOption from '../chatInput/ChatOption'
// const offline = true;

class EventList extends Component {
  constructor(){
    super();
    this.state = {
      textValue: 'test'
    }
  }

  logout(){
    console.log(Meteor.user());
    // console.log(this.props.user);
    // Meteor.logout();
    // Actions.auth({type: "reset"});
  }

  render() {
    // this._loadUser();
    const { 
      outerContainer
    } = styles;

    return (
      <View style={outerContainer}>
        <NavBar
          sideMenuButton={true}
          newButton={true}
        />
        <Button
          onPress={this.logout.bind(this)}
          title="Logout"
          color={Colours.app}          
        />
        <ChatOption
          label="Choose from photo libray"
          icon="camera"
        />
      </View>
    )
  }
}

const styles = {
  outerContainer: {
    flex: 1
  },
}

const mapStateToProps = (state) => {
  const { userId, displayName, phoneNumber } = state.user;

  return { userId, displayName, phoneNumber };
};

const EventListConnected = createContainer(params=>{
  // Meteor.subscribe('items');
  return {
    // eventList: Meteor.collection('items').find(),
    // meteorUser: Meteor.user(),
    // status: Meteor.status()
  };
}, EventList)

export default connect(mapStateToProps, { loadUser })(EventListConnected);