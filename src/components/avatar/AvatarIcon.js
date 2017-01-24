import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colours } from '../styles';


class AvatarIcon extends Component {

  render(){
    const {
      outerContainer,
      innerContainer,
      innerContainerLarge
    } = styles;

    return (
      <View style={outerContainer}>
        <View style={this.props.large ? innerContainerLarge : innerContainer}>
          <Icon name={this.props.iconName} size={this.props.large ? 28 : 24} color={Colours.light}/>        
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
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colours.app,    
  },

  innerContainerLarge: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: Colours.app,    
  }
}

export default AvatarIcon;