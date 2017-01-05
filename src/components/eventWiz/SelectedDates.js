import moment from 'moment';
import React, { Component } from 'react';
import { TouchableOpacity, LayoutAnimation, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ChatInfoItem from '../chatView/ChatInfoItem'
import { Border } from '../common';
import { Colours, Fonts } from '../styles';

class SelectedDates extends Component {

  componentWillUpdate(){
    LayoutAnimation.spring();
  }

  changeDates(){
    console.log("change dates");
     Actions.calendarPicker();    
  }

  renderTime(){
    if (!this.props.dates[0].startTime) return <View/>
    const startTime = moment(this.props.dates[0].startTime, "h:mm A").format("h:mm A");
    if (!this.props.dates[0].endTime){
      return <Text style={Fonts.chatInfoSubheader}>{startTime}</Text>
    }
    const endTime = moment(this.props.dates[0].endTime, "h:mm A").format("h:mm A");
    return <Text style={Fonts.chatInfoSubheader}>{startTime} - {endTime}</Text>
  }

  renderSelectedInfo(){
    if (this.props.dates.length == 1){
      console.log(this.props.dates[0].startTime);
      return (
        <View>
          <Text style={Fonts.chatInfoHeader}>{moment().add(this.props.dates[0].daysFromNow, 'days').format('ddd D MMM')}</Text>
          {this.renderTime()}
        </View>
      )
    }
    return (
      <View>
        <Text style={Fonts.chatInfoSubheader}>{this.props.dates.length} dates suggested</Text>
      </View>
    )    
  }

  render(){
    if (!this.props.datesSelected) {
      return <View/>
    }
    const {
      infoContainer,
      iconContainer,
      inviteInfoContainer,
      itemTextButton,
      textButtonText
    } = styles;
    const _this = this;
    return (
      <ChatInfoItem
        iconName='clock-o'
        buttonArrow
        onPress={this.changeDates.bind(this)}
      >
        {this.renderSelectedInfo()}
      </ChatInfoItem>
      // <View>
      //   <View style={infoContainer}>
      //     <View style={iconContainer}>
      //       <Icon name={this.props.contacts.length === 1 ? 'user' : 'users'} size={16} color={Colours.iconShade}/>
      //     </View>
      //     <View style={inviteInfoContainer}>
      //       {this.renderSelectedInfo(this.props.contacts)}
      //     </View>
      //     <TouchableOpacity style={itemTextButton}>
      //       <Text style={textButtonText}>Change</Text>
      //     </TouchableOpacity>             
      //   </View>
      // </View>
    )
  }
}

const styles = {
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: Colours.navBarBack
  },

  iconContainer: {
    width: 40,
    minHeight: 40,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  inviteInfoContainer: {
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    flex: 1
  },

  itemTextButton: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    justifyContent: 'center'
  },

  textButtonText: {
    color: Colours.app
  }
}

const mapStateToProps = (state) => {
  const { dates, datesSelected } = state.eventInfo;
  return { dates, datesSelected };
};

export default connect(mapStateToProps, { })(SelectedDates);
