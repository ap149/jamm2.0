import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colours, Fonts } from '../styles';

const NavTextButton = ({onPress, disabled, children, fixed, buttonRight}) => {
  const {
    textButton,
    textButtonDisabled,    
    textButtonFixedWidth,
    textButtonDisabledFixedWidth,
    textButtonRight,
    textButtonDisabledRight,
    textButtonFixedWidthRight,
    textButtonDisabledFixedWidthRight
  } = styles;

  let selectedStyle;
  if (buttonRight){
    if (disabled){
      selectedStyle = fixed ? textButtonDisabledFixedWidthRight : textButtonDisabledRight;
    } else {
      selectedStyle = fixed ? textButtonFixedWidthRight : textButtonRight;      
    }
  } else {
    if (disabled){
      selectedStyle = fixed ? textButtonDisabledFixedWidth : textButtonDisabled;
    } else {
      selectedStyle = fixed ? textButtonFixedWidth : textButton;      
    }
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
    paddingHorizontal: 8,
    paddingVertical: 9,
  },
  textButtonDisabled: {
    color: Colours.navBarButtonDisabled,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 9
  },  
  textButtonFixedWidth: {
    color: Colours.navBarButton,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 9,
    maxWidth: 72,
    minWidth: 72
  },
  textButtonDisabledFixedWidth: {
    color: Colours.navBarButtonDisabled,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 9,
    maxWidth: 72,
    minWidth: 72
  },
  textButtonRight: {
    textAlign: 'right',
    color: Colours.navBarButton,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 9,
  },
  textButtonDisabledRight: {
    textAlign: 'right',
    color: Colours.navBarButtonDisabled,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 9
  },  
  textButtonFixedWidthRight: {
    textAlign: 'right',
    color: Colours.navBarButton,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 9,
    maxWidth: 72,
    minWidth: 72
  },
  textButtonDisabledFixedWidthRight: {
    textAlign: 'right',
    color: Colours.navBarButtonDisabled,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 9,
    maxWidth: 72,
    minWidth: 72
  }  
}

export { NavTextButton };