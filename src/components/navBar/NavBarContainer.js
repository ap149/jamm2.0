import React from 'react';
import { View } from 'react-native';
import { Border } from '../common';
import { Colours } from '../styles';

const NavBarContainer = ({children}) => {
  const {
    outerContainer,
    innerContainer
  } = styles;

  return (
    <View style={outerContainer}>
      <View style={innerContainer}>
        {children}
      </View>
      <Border/>
    </View>
  );
}

const styles = {
  outerContainer: {
    backgroundColor: Colours.navBarBack,
    paddingTop: 21,
    minHeight: 47,
  },

  innerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  }

}

export { NavBarContainer };