import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, LayoutAnimation } from 'react-native';
import Meteor from 'react-native-meteor';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { resetEventInfo } from '../../actions';
import { NavBarContainer } from '../navBar/NavBarContainer';
import { NavTextButton } from '../navBar/NavTextButton';
import AvatarIcon from '../avatar/AvatarIcon';
import { Colours, Fonts } from '../styles';
import { Border } from '../common';

class EventWizNavBar extends Component {

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  cancel() {
    // console.log(this.props.messages);
    // Meteor.call('resetEventWiz');            
    Actions.pop();    
    this.props.resetEventInfo();    
  }
  
  editInfo(){
    console.log("edit event name");
    console.log(this.props.eventName);
    console.log(this.props.iconName);
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
          <Text style={Fonts.navSubheader}>arranged by {this.props.arrangedBy}</Text>
        </View>        
      )
    } else {
      return <View/>
    }
  }

  renderEditButton(){
    if (this.props.eventName){
      return (
        <NavTextButton
          onPress={this.editInfo.bind(this)}
          label="Edit"        
        />        
      )      
    }
  }

  render(){
    const {
      midContainer,
    } = styles;

    return (
      <NavBarContainer>
        <NavTextButton
          onPress={this.cancel.bind(this)}
          label="Cancel"
        />
        <View style={midContainer}>
          {this.renderGraphic()}
          {this.renderEventInfo()}
        </View>
        {this.renderEditButton()}
      </NavBarContainer>
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
    // justifyContent: 'space-between'    
  }
}

const mapStateToProps = (state) => {
  const { messages, eventName, arrangedBy, imgUrl, iconName } = state.eventInfo;
  return { messages, eventName, arrangedBy, imgUrl, iconName };
};

export default connect(mapStateToProps, { resetEventInfo })(EventWizNavBar);
