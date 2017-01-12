import moment from 'moment';
import { connect } from 'react-redux';
import { setDatesSelected, clearDates, updateStatus, pushMessage } from '../../actions';
import { Actions } from 'react-native-router-flux';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as Helpers from '../common/Helpers';
import * as EventWizHelpers from '../eventWiz/EventWizHelpers';
import { EventStatus } from '../eventWiz/EventStatus';
import NavBar from '../navBar/NavBar';
import { NavTextButton } from '../navBar/NavTextButton';
import CalendarMatrix from './CalendarMatrix';
import DateOption from './DateOption';
import { Border, Note } from '../common';
import { Colours } from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';          

class CalendarPicker extends Component {
  constructor(){
    super();
    this.state = {
      monthAdj: 0
    }
  }

  cancel(){
    this.props.clearDates();
    Actions.pop();
  }

  done(){
    this.props.updateStatus(false);    
    Actions.pop();
    Helpers.delayDefault()
    .then(() => {
      // const msg2 = EventWizHelpers.createBotMessage(EventWizHelpers.msg.NEW_GROUP_NAME);
      // this.props.pushMessage(msg2);
      if (!this.props.datesSelected){
        const str = this.props.dates.length > 1 ? `${this.props.dates.length} dates suggested` : "Date selected";
        const msg = EventWizHelpers.createAutoMessage(str);
        this.props.pushMessage(msg);
        const msg2 = EventWizHelpers.createBotMessage(EventWizHelpers.msg.PROMPT_LOCATION);
        this.props.pushMessage(msg2);
        this.props.updateStatus(EventStatus.PROMPT_LOCATION);
        this.props.setDatesSelected();
      }
    })    
  }

  monthBack(){
    this.setState({
      monthAdj: this.state.monthAdj - 1
    })
  }

  monthForward(){
    this.setState({
      monthAdj: this.state.monthAdj + 1
    })
  }

  renderNote(){
    if (this.props.dates.length > 0) {
      return <View/>
    } else {
      return (
        <Note>
          Pick a date or suggest as many options as you like
        </Note>
      )
    }
  }

  renderDateOptions(){
    const dates = this.props.dates;
    let dateOptions = [];
    for (i=0; i<dates.length; i++){
      dateOptions.push(
        <DateOption
          key={i}
          index={dates[i].index}
          daysFromToday={dates[i].daysFromToday}
          startTime={dates[i].startTime}
          endTime={dates[i].endTime}
        />
      )
    }
    return (
      dateOptions
    );
  }

  render(){
    const {
      midContainer,
      calendarHeader,
      calendarNavIcon,
      monthLabelContainer,
      monthLabel
    } = styles;

    return (
      <View>
        <NavBar
          buttonLeftLabel={this.props.datesSelected ? ' ' : 'Cancel'}
          buttonLeftPress={this.cancel.bind(this)}
          buttonLeftFixed={true}
          buttonRightLabel="Done"
          buttonRightPress={this.done.bind(this)}
          buttonRightDisabled={this.props.dates.length == 0}
          buttonRightFixed={true}
          title="Choose dates"
        >          
        </NavBar>
        <View style={calendarHeader}>
          <TouchableOpacity
            style={calendarNavIcon}
            disabled={this.state.monthAdj === 0}
            onPress={this.monthBack.bind(this)}
          >
            <Icon name='chevron-circle-left' size={24} color={this.state.monthAdj === 0 ? Colours.disabled : '#fff'} />
          </TouchableOpacity>
          <View style={monthLabelContainer}>
            <Text style={monthLabel}>{moment().add(this.state.monthAdj, 'M').format('MMM YYYY')}</Text>
          </View>
          <TouchableOpacity
            style={calendarNavIcon}
            onPress={this.monthForward.bind(this)}
          >
            <Icon name='chevron-circle-right' size={24} color='#fff' />
          </TouchableOpacity>
        </View>
        <Border/>
        <CalendarMatrix
          style={{paddingBottom: 10}}
          displayMonth={moment().add(this.state.monthAdj, 'M').startOf('month')}
        />
        <Border/>
        {this.renderNote()}        
        <ScrollView>
          {this.renderDateOptions()}
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  midContainer: {
    flex: 1,
    alignItems: 'center'
    // flexDirection: 'row',
    // paddingLeft: 7
  },

  calendarHeader: {
    flexDirection: 'row',
    backgroundColor: Colours.appMain
  },

  calendarNavIcon: {
    width: 40,
    alignItems: 'center',
    paddingTop: 11,
    paddingBottom: 10,
  },

  monthLabelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  monthLabel: {
    color: '#fff',
    fontSize: 16,
    // fontWeight: 'bold',
  }
}

const mapStateToProps = (state) => {
  const { dates, datesSelected } = state.eventInfo;
  return { dates, datesSelected };
};

export default connect(mapStateToProps, { setDatesSelected, clearDates, updateStatus, pushMessage })(CalendarPicker);