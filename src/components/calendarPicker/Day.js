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
        return true;
      }
    }
    return false;
  }

  getContainerStyle(){
    const {
      innerContainerDefault,
      innerContainerSelected,
    } = styles;

    if (this.props.disabled || !this.isSelected()){
      return innerContainerDefault;
    }
    return innerContainerSelected;
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
    if (this.isSelected()){
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
          <Text style={this.getTextStyle()}>{this.props.date}</Text>
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
    height: 34,
    width: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    backgroundColor: Colours.app
  },

  textDefault: {

  },

  textSelected: {
    color: '#fff',
    fontWeight: '500'
  },

  textDisabled: {
    color: '#ddd'
  }
}

const mapStateToProps = (state) => {
  const { dates } = state.eventInfo;
  return { dates };
};

export default connect(mapStateToProps, { toggleDate })(Day);
