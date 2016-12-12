import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colours, Fonts } from '../styles';

const NavTextButton = ({onPress, label, disabled}) => {
  const {
    textButton,
    textButtonDisabled,
  } = styles;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={disabled ? textButtonDisabled : textButton}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = {
  textButton: {
    color: Colours.app,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 9
  },
  textButtonDisabled: {
    color: '#aaa',
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 9
  },
}

export { NavTextButton };