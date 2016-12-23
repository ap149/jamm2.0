import moment from 'moment';
import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker'
import { View, Text, TouchableOpacity } from 'react-native';
import { Border } from '../common';

class DateOption extends Component {
  constructor(props){
    super(props);
    this.state = {
      startTime: null,
      endTime: null,
      minDate: moment().startOf('day'),
      maxDate: moment().endOf('day'),
    }
  }

  setStartTime(date){
    this.setState({startTime: date});
    console.log(date);
  }

  setEndTime(date){
    this.setState({endTime: date});
    console.log(date);
  }

  renderStartTime(){
    return (
      <DatePicker
        style={{width: 70}}
        mode="time"
        date={this.state.startTime}
        placeholder="Start time"
        format="h:mm A"
        confirmBtnText="Done"
        cancelBtnText="Cancel"
        showIcon={false}
        customStyles={{
          dateInput: {
            borderWidth: 0,
            paddingHorizontal: 0
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setStartTime(date)}}
      />      
    );    
  }

  renderEndTime(){
    if (!this.state.startTime){
      return (
        <View>
          <Text>(optional)</Text>
        </View>
      )
    }
    return (
      <DatePicker
        style={{width: 70}}
        mode="time"
        date={this.state.endTime}
        placeholder="End time"
        format="h:mm A"
        confirmBtnText="Done"
        cancelBtnText="Cancel"
        showIcon={false}
        customStyles={{
          dateInput: {
            borderWidth: 0,
            paddingHorizontal: 0
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setEndTime(date)}}
      />      
    );    
  }

  render(){
    const {
      innerContainer,
      dateContainer,
      timepickerContainer
    } = styles;

    return (
      <View>
        <View style={innerContainer}>
          <View style={dateContainer}>
            <Text>{moment().add(this.props.daysFromToday, 'days').format('dddd')}</Text>
            <Text>{moment().add(this.props.daysFromToday, 'days').format('D MMM')}</Text>
          </View>
          <View style={timepickerContainer}>{this.renderStartTime()}</View>
          <View style={timepickerContainer}>{this.renderEndTime()}</View>
        </View> 
        <Border />
      </View>
    );
  }
}
const styles = {
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8
  },

  dateContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  timepickerContainer: {
    flex: 1,
    justifyContent: 'center'
  }
}

export default DateOption;