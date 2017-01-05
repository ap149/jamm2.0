import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colours, Fonts } from '../styles';

const NavTextButton = ({onPress, disabled, children, fixed}) => {
  const {
    textButton,
    textButtonFixedWidth,
    textButtonDisabled,
    textButtonDisabledFixedWidth
  } = styles;

  let selectedStyle;
  if (disabled){
    selectedStyle = fixed ? textButtonDisabledFixedWidth : textButtonDisabled;
  } else {
    selectedStyle = fixed ? textButtonFixedWidth : textButton
  }
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={selectedStyle}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = {
  textButton: {
    color: Colours.navBarButton,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  textButtonFixedWidth: {
    color: Colours.navBarButton,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    maxWidth: 70,
    minWidth: 70
  },
  textButtonDisabled: {
    color: Colours.navBarButtonDisabled,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 9
  },
  textButtonDisabledFixedWidth: {
    color: Colours.navBarButtonDisabled,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 9,
    maxWidth: 70,
    minWidth: 70
  }
}

export { NavTextButton };