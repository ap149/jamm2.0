import moment from 'moment';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { NavBarContainer } from '../navBar/NavBarContainer';
import { NavTextButton } from '../navBar/NavTextButton';
import CalendarMatrix from './CalendarMatrix';
import DateOption from './DateOption';
import { Border } from '../common';
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
    this.setState({monthAdj: this.state.monthAdj + 1});
    // Actions.pop();
  }

  done(){
    Actions.pop();
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

  renderDateOptions(){
    const dates = this.props.dates;
    let dateOptions = [];
    for (i=0; i<dates.length; i++){
      dateOptions.push(
        <DateOption
          key={i}
          index={dates[i].index}
          daysFromToday={dates[i].daysFromToday}
        />
      )
    }
    console.log(dateOptions);
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
        <NavBarContainer>
          <NavTextButton
            onPress={this.cancel.bind(this)}
            label="Cancel"
          />                  
          <View style={midContainer}>
            
          </View>
          <NavTextButton
            onPress={this.done.bind(this)}
            label="Done"
            // disabled={this.props.contacts.length === 0}
          />                            
        </NavBarContainer>
        <View style={calendarHeader}>
          <TouchableOpacity
            style={calendarNavIcon}
            disabled={this.state.monthAdj === 0}
            onPress={this.monthBack.bind(this)}
          >
            <Icon name='chevron-left' size={24} color={this.state.monthAdj === 0 ? Colours.appDisabled : Colours.app} />
          </TouchableOpacity>
          <View style={monthLabelContainer}>
            <Text style={monthLabel}>{moment().add(this.state.monthAdj, 'M').format('MMM YYYY')}</Text>
          </View>
          <TouchableOpacity
            style={calendarNavIcon}
            onPress={this.monthForward.bind(this)}
          >
            <Icon name='chevron-right' size={24} color={Colours.app} />
          </TouchableOpacity>
        </View>
        <Border />
        <CalendarMatrix
          displayMonth={moment().add(this.state.monthAdj, 'M').startOf('month')}
        />
        <Border />
        {this.renderDateOptions()}
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
    flexDirection: 'row'
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
    fontSize: 16,
    fontWeight: '500'
  }
}

const mapStateToProps = (state) => {
  const { dates } = state.eventInfo;
  return { dates };
};

export default connect(mapStateToProps, {  })(CalendarPicker);