import moment from 'moment';
import { connect } from 'react-redux';
import { toggleDate } from '../../actions';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colours, Fonts } from '../styles';

class Day extends Component {
  
  onPress(){
    this.props.toggleDate(this.props.daysFromToday);
  }

  isSelected(){
    for (i=0; i<this.props.dates.length; i++) {
      if (this.props.dates[i].daysFromToday == this.props.daysFromToday){
        return this.props.dates[i].startTime ? 2 : 1;
      }
    }
    return 0;
  }

  getContainerStyle(){
    const {
      innerContainerDefault,
      innerContainerSelected,
      innerContainerTimeSelected
    } = styles;
    const isSelected = this.isSelected();
    if (this.props.disabled || isSelected == 0){
      return innerContainerDefault;
    }
    return isSelected == 1 ? innerContainerSelected : innerContainerTimeSelected
  }

  getTextStyle(){
    const {
      cell,
      textDefault,
      textSelected,
      textDisabled
    } = styles;

    if (this.props.disabled){
      return textDisabled;
    }
    if (this.isSelected() == 1){
      return textSelected;
    }
    return textDefault;
  }

  render(){
    const {
      cell,
      innerContainerDefault,
      innerContainerSelected,
      textDefault,
      textSelected
    } = styles;
    return (
      <TouchableOpacity 
        style={cell}
        onPress={this.onPress.bind(this)}
        disabled={this.props.disabled}>
        <View style={this.getContainerStyle()}>
          <Text style={this.getTextStyle()}>{this.props.day}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = {
  cell: {
    flex: 1,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerContainerDefault: {
    height: 34,
    width: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerContainerSelected: {
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: Colours.appMain
  },

  innerContainerTimeSelected: {
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colours.appMain
  },

  textDefault: {
    color: Colours.appMain
  },

  textSelected: {
    color: '#fff',
    fontWeight: '500'
  },

  textDisabled: {
    color: Colours.disabled
  }
}

const mapStateToProps = (state) => {
  const { dates } = state.newEventInfo;
  return { dates };
};

export default connect(mapStateToProps, { toggleDate })(Day);
