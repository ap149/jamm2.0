import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colours, Fonts } from '../styles';

const NavIconButton = ({onPress, children}) => {
  const {
    iconButton
  } = styles;

  return (
    <TouchableOpacity onPress={onPress} >
      <Icon style={iconButton} name={children} />
    </TouchableOpacity>
  );
}

const styles = {
  iconButton: {
    color: Colours.app,
    fontSize: 21
  },
}

export { NavIconButton };