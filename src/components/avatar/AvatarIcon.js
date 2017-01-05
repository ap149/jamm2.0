import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colours } from '../styles';


class AvatarIcon extends Component {

  render(){
    const {
      outerContainer,
      innerContainer
    } = styles;

    return (
      <View style={outerContainer}>
        <View style={innerContainer}>
          <Icon name={this.props.iconName} size={20} color={Colours.light}/>        
        </View>
      </View>
    )
  }
}

const styles = {
  outerContainer: {

    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,

  },

  innerContainer: {
    height: 36,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: Colours.app,    
  }
}

export default AvatarIcon;