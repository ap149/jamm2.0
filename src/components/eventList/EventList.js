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
import Meteor, { createContainer, MeteorListView } from 'react-native-meteor';
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
    console.log(this.props.eventList);
    // console.log(Meteor.user());
    // console.log(this.props.user);
    // Meteor.logout();
    // Actions.auth({type: "reset"});
  }

  newEvent(){
    Actions.eventWiz();
  }

  // renderEventItems(){
  //   console.log(this.props.eventList);
  //   const eventList = this.props.eventList
  //   let eventItems = [];
  //   for (i=0; i< eventList.length; i++){
  //     eventList.push(
  //       <View>
  //         <Text>{eventList[i].eventName}</Text>
  //         <Text>{eventList[i]._id}</Text>
  //       </View>
  //     )
  //   }
  //   return eventItems;
  // }

  renderRow(eventItem){
    return (
      <View>
        <Text>{eventItem.eventName}</Text>
        <Text>{eventItem._id}</Text>
      </View>
    )
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
          buttonRightLabel="New event"
          buttonRightPress={this.newEvent.bind(this)}
          buttonRightFixed={false}
        />
        <Button
          onPress={this.logout.bind(this)}
          title="Logout"
          color={Colours.app}          
        />
        <MeteorListView
          collection="eventsList"
          options={{sort: {updated: -1}}}
          renderRow={this.renderRow}
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
  Meteor.subscribe('eventsList');
  return {
    // eventList: Meteor.collection('events').find(),
    // meteorUser: Meteor.user(),
    // status: Meteor.status()
  };
}, EventList)

export default connect(mapStateToProps, { loadUser })(EventListConnected);