import moment from 'moment';
import React, { Component } from 'react';
import { TouchableOpacity, LayoutAnimation, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ChatInfoItem from '../chatView/ChatInfoItem'
import { Border } from '../common';
import { Colours, Fonts } from '../styles';

class Dates extends Component {

  componentWillUpdate(){
    LayoutAnimation.spring();
  }

  onPress(){
    console.log('pressed');
  }

  renderTime(){
    const dateOptions = this.props.dateOptions;
    if (!dateOptions[0].startTime) return <View/>
    const startTime = moment(dateOptions[0].startTime, "h:mm A").format("h:mm A");
    if (!dateOptions[0].endTime){
      return <Text style={Fonts.chatInfoSubheader}>{startTime}</Text>
    }
    const endTime = moment(dateOptions[0].endTime, "h:mm A").format("h:mm A");
    return <Text style={Fonts.chatInfoSubheader}>{startTime} - {endTime}</Text>
  }

  renderInfo(){
    const dateOptions = this.props.dateOptions;
    if (dateOptions.length == 1){
      return (
        <View>
          <Text style={Fonts.chatInfoHeader}>{moment().add(dateOptions[0].daysFromToday, 'days').format('ddd D MMM')}</Text>
          {this.renderTime()}
        </View>
      )
    }
    return (
      <View>
        <Text style={Fonts.chatInfoHeader}>{dateOptions.length} dates suggested</Text>
      </View>
    )    
  }

  render(){

    return (
      <ChatInfoItem
        iconName='clock-o'
        buttonArrow
        onPress={this.onPress.bind(this)}
      >
        {this.renderInfo()}
      </ChatInfoItem>
    )
  }
}

export default Dates;
