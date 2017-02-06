import moment from 'moment';
import { connect } from 'react-redux';
import { removeDate, setStartTime, setEndTime } from '../../actions';
import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker'
import { View, Text, TouchableOpacity, LayoutAnimation } from 'react-native';
import { Border } from '../common';
import { Colours, Fonts } from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

class DateOption extends Component {
  constructor(props){
    super(props);
    this.state = {
      minDate: moment().startOf('day'),
      maxDate: moment().endOf('day'),
    }
  }

  componentWillUpdate(){
    LayoutAnimation.spring();
  }

  setStartTime(date){
    this.setState({startTime: date});
    this.props.setStartTime(this.props.index, date);
  }

  setEndTime(date){
    this.setState({endTime: date});
    this.props.setEndTime(this.props.index, date);
  }

  removeDate(){
    this.props.removeDate(this.props.index)
  }

  renderStartTime(){
    return (
      <DatePicker
        style={{width: 70}}
        mode="time"
        date={this.props.startTime}
        placeholder="Start time (optional)"
        format="h:mm A"
        confirmBtnText="Done"
        cancelBtnText="Cancel"
        showIcon={false}
        customStyles={{
          dateInput: {
            borderWidth: 0,
            paddingHorizontal: 0,
            alignItems: 'center'
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setStartTime(date)}}
      />      
    );    
  }

  renderEndTime(){
    if (!this.props.startTime){
      return (
        <View/>
      )
    }
    return (
      <DatePicker
        style={{width: 70}}
        mode="time"
        date={this.props.endTime}
        placeholder="End time (optional)"
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
      day,
      date,
      timepickerContainer,
      buttonOuter,
      buttonInner
    } = styles;

    return (
      <View>
        <View style={innerContainer}>
          <View style={dateContainer}>
            <Text style={day}>{moment().add(this.props.daysFromToday, 'days').format('dddd').toUpperCase()}</Text>
            <Text style={date}>{moment().add(this.props.daysFromToday, 'days').format('D MMM')}</Text>
          </View>
          <View style={timepickerContainer}>{this.renderStartTime()}</View>
          <View style={{width: 26, alignItems: 'center'}}><Text>{this.props.endTime ? 'to' : ""}</Text></View>
          <View style={timepickerContainer}>{this.renderEndTime()}</View>
          <View style={buttonOuter}>
            <TouchableOpacity
              style={buttonInner}
              onPress={() => this.removeDate()}>
              <Icon name='times' size={16} color={Colours.app}/>
            </TouchableOpacity>
          </View>          
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
    // paddingHorizontal: 8,
    paddingVertical: 5
  },

  dateContainer: {
    width: 110,
    justifyContent: 'center',
    paddingLeft: 12,
  },

  day: {
    color: '#777',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16
  },

  date: {
    fontWeight: '500',
    lineHeight: 18
  },

  timepickerContainer: {
    // flex: 1,
    width: 70,
    alignItems: 'center',
  },

  buttonOuter: {
    // width: 40,
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  buttonInner: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const mapStateToProps = (state) => {
  const { dates } = state.newEventInfo;
  return { dates };
};

export default connect(mapStateToProps, { removeDate, setStartTime, setEndTime })(DateOption);