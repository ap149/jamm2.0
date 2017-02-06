import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, LayoutAnimation, Alert } from 'react-native';
import Meteor from 'react-native-meteor';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as Helpers from '../common/Helpers';
import { resetEventInfo } from '../../actions';
import NavBar  from '../navBar/NavBar';
import AvatarIcon from '../avatar/AvatarIcon';
import { Colours, Fonts } from '../styles';
import { Border } from '../common';
import { EventStatus } from '../eventWiz/EventStatus';

class EventWizNavBar extends Component {

  // componentWillUpdate() {
  //   LayoutAnimation.spring();
  // }

  confirmCancel(){
    Actions.pop();
    Helpers.delayDefault()
    .then(() => {
      this.props.resetEventInfo();  
    });     
  }

  pressCancel() {
    // console.log(this.props.messages);
    // Meteor.call('resetEventWiz');            
    // Actions.pop();
    if (this.props.contactsSelected){
      let _self = this;
      Alert.alert(
        'Confirm cancel',
        null,
        [
          {text: "Don't cancel", onPress: () => console.log('Cancel Pressed!')},
          {text: "Yes", onPress: () => _self.confirmCancel()},
        ]
      ); 
    } else {
      this.confirmCancel();
    } 
  }
  
  editInfo(){
    console.log("edit info");
    Actions.iconPicker({
      newEventMode: true,
      eventName: this.props.eventName,
      iconName: this.props.iconName,
      eventId: false
    });
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

    if (this.props.eventName){
      return (
        <View style={eventInfoContainer}>
          <Text style={Fonts.navHeader}>{this.props.eventName}</Text>
          <Text style={Fonts.navSubheader}>Tap to change title or icon</Text>
        </View>        
      )
    } else {
      return <View/>
    }
  }

  renderMain(){
    if (this.props.eventName){
      return (
        <TouchableOpacity 
          onPress={this.editInfo.bind(this)}
          style={styles.midContainer}
        >
          {this.renderGraphic()}
          {this.renderEventInfo()}
        </TouchableOpacity>
      )
    }
  }

  render(){
    const {
      midContainer,
    } = styles;

    return (
      <NavBar
        buttonLeftPress={this.pressCancel.bind(this)}
        buttonLeftLabel="Cancel"
        buttonLeftDisabled={this.props.status == EventStatus.SENDING}
        // buttonRightLabel={this.props.eventName ? 'Change' : false}
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

const mapStateToProps = (state) => {
  const { messages, eventName, arrangedBy, imgUrl, iconName, contactsSelected, status } = state.newEventInfo;
  return { messages, eventName, arrangedBy, imgUrl, iconName, contactsSelected, status };
};

export default connect(mapStateToProps, { resetEventInfo })(EventWizNavBar);
