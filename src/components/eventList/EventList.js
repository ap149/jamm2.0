import React, { Component } from 'react';
import { 
  View, 
  ScrollView,
  Text, 
  TouchableOpacity,
  LayoutAnimation,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Meteor, { createContainer, MeteorComplexListView } from 'react-native-meteor';
import store from 'react-native-simple-store';
import { loadUser } from '../../actions';
import EventListItem from './EventListItem';
import NavBar  from '../navBar/NavBar';
import { Colours } from '../styles';
// const offline = true;

class EventList extends Component {

  componentWillUpdate(){
    // LayoutAnimation.spring();
  }

  logout(){
    console.log(this.props.eventsList);
  }

  newEvent(){
    Actions.newEventWiz({eventName: null});
  }

  renderRow(eventItem){
    const {
      itemContainer
    } = styles;
    
    return (
      <EventListItem
        eventItem={eventItem}
      />
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

        <MeteorComplexListView
          elements={()=>{return Meteor.collection('events').find(
            {},
            {
              fields: {
                updated: 1,
                readBy: 1,
                eventName: 1,
                arrangedBy: 1,
                iconName: 1,
                groupName: 1,
                users: 1,
                imgUrl: 1,
                iconName: 1,
                dateOptions: 1
              },
              sort: {
                updated: -1
              }
            }
          )}}

          // collection="events"
          // options={{sort: {updated: -1}}}
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
  itemContainer: {
    flexDirection: 'row'
  }
}

const mapStateToProps = (state) => {
  const { userId, displayName, phoneNumber } = state.user;

  return { userId, displayName, phoneNumber };
};

const EventListConnected = createContainer(params=>{
  Meteor.subscribe('eventsList');
  return {
    eventsList: Meteor.collection('events').find(),
    // meteorUser: Meteor.user(),
    // status: Meteor.status()
  };
}, EventList)

export default connect(mapStateToProps, { loadUser })(EventListConnected);