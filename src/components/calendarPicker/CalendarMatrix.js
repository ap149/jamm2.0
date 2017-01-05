import moment from 'moment';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Day from './Day';
import { Colours } from '../styles';

class CalendarMatrix extends Component {

  renderMatrix(){
    const DISPLAY_MONTH = this.props.displayMonth;
    const STARTING_DAY = moment(DISPLAY_MONTH).isoWeekday();
    const DAYS_IN_MONTH = moment(DISPLAY_MONTH).daysInMonth();
    const ROWS_IN_MONTH = Math.ceil(DAYS_IN_MONTH - (8 - STARTING_DAY)) / 7 + 1;
    let
      i, j, day, daysFromToday, date,
      daysRow = [],
      rows = [],
      counter = 0;
    const MONTH = moment(DISPLAY_MONTH).month();
    const YEAR = moment(DISPLAY_MONTH).year();
    for (i=0; i < ROWS_IN_MONTH ; i++){
      daysRow = [];
      for (j=1; j<8 ; j++){
        day = -STARTING_DAY + 7 * (i) + j + 1;
        daysFromToday = moment(DISPLAY_MONTH).add(day - 1, 'days').diff(moment().startOf('day'), 'days');
        date = moment().startOf('days').add(daysFromToday, 'days');
        if (day < 1 || day > DAYS_IN_MONTH){
          daysRow.push(<Day
            key={counter}
            day=''
            date={date}
            month={MONTH}
            year={YEAR}
            daysFromToday={daysFromToday}
            disabled={true}
          />);          
        } else {
          daysRow.push(<Day
            key={counter}
            day={day}
            date={date}
            month={MONTH}
            year={YEAR}
            daysFromToday={daysFromToday}
            disabled={daysFromToday < 0}
          />);
        }
        counter ++;        
      }
      rows.push(<View key={i} style={{flexDirection: 'row'}}>{daysRow}</View>);   
    }
    return <View>{rows}</View>
  }


  render(){
    const {
      dowOuterContainer,
      dowInnerContainer,
      dowText
    } = styles;

    return (
      <View style={{backgroundColor: Colours.shadedBack}}>
        <View style={dowOuterContainer}>
          <View style={dowInnerContainer}><Text style={dowText}>M</Text></View>
          <View style={dowInnerContainer}><Text style={dowText}>T</Text></View>
          <View style={dowInnerContainer}><Text style={dowText}>W</Text></View>
          <View style={dowInnerContainer}><Text style={dowText}>T</Text></View>
          <View style={dowInnerContainer}><Text style={dowText}>F</Text></View>
          <View style={dowInnerContainer}><Text style={dowText}>S</Text></View>
          <View style={dowInnerContainer}><Text style={dowText}>S</Text></View>
        </View>
        {this.renderMatrix()}
      </View>
    )
  }
}

const styles = {
  dowOuterContainer: {
    flexDirection: 'row',
  },

  dowInnerContainer: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: 'center',
    
  },

  dowText: {
    fontSize: 12,
    // color: '#fff',
    fontWeight: '500'
  }

}

export default CalendarMatrix;
