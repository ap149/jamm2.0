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

  goBack(){
    Actions.pop();
  }

  renderGraphic(){
    if (this.props.imgUrl){
      return (
        <View>
          <Text>img</Text>
        </View>
      )
    }
    if (this.props.iconName){
      return (
        <AvatarIcon
          iconName={this.props.iconName}
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
    } = this.props;

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
        onPress={this.props.toggleInfo}
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

export default EventDetailNavBar;