import Meteor, { createContainer, MeteorComplexListView } from 'react-native-meteor';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { 
  View,
  Text, 
  TouchableOpacity,
  LayoutAnimation
} from 'react-native';
import { Colours, Fonts } from '../styles';
import AvatarIcon from '../avatar/AvatarIcon';
import NavBar  from '../navBar/NavBar';

class EventDetailNavBar extends Component {
  // constructor(props){
  //   super(props);
  //   console.log(props.eventId);
  // }

  goBack(){
    Actions.pop();
  }

  renderGraphic(){
    if (this.props.eventItem.imgUrl){
      return (
        <View>
          <Text>img</Text>
        </View>
      )
    }
    if (this.props.eventItem.iconName){
      return (
        <AvatarIcon
          iconName={this.props.eventItem.iconName}
        />
      )
    }
  }

  renderEventInfo(){
    const {
      eventInfoContainer
    } = styles;

    const {
      eventName,
      arrangedBy
    } = this.props.eventItem;

    return (
      <View style={eventInfoContainer}>
        <Text style={Fonts.navHeader}>{eventName}</Text>
        <Text style={Fonts.navSubheader}>{`arranged by ${arrangedBy}`}</Text>
      </View>
    )
  }

  renderMain(){
    const {
      midContainer,
    } = styles;

    return (
      <TouchableOpacity 
        onPress={() => console.log('edit info')}
        style={styles.midContainer}
      >
        {this.renderGraphic()}
        {this.renderEventInfo()}
      </TouchableOpacity>
    )
  }

  render(){
    return (
      <NavBar
        buttonLeftPress={this.goBack.bind(this)}
        buttonLeftIcon="chevron-left"
      >
        {this.renderMain()}
      </NavBar>      
    )
  }
}

const styles = {
  midContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 7
  },

  eventInfoContainer: {
    paddingLeft: 7,
    paddingRight: 14,
    paddingVertical: 4,
    justifyContent: 'center'    
  }
}

const EventDetailNavBarConnected = createContainer((props)=>{
  Meteor.subscribe('events');
  return {
    eventItem: Meteor.collection('events').findOne({'_id':props.eventId}),
  };
}, EventDetailNavBar)

export default connect(null, { })(EventDetailNavBarConnected);;