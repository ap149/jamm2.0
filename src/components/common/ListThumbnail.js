import React from 'react';
import { View } from 'react-native';
import { Colours } from '../styles'

const ListThumbnail = () => {
  const { outerContainer, innerContainer } = styles;

  return (
    <View style={outerContainer}>
      <View style={innerContainer} />
    </View>
  );
};

const styles = {
  outerContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8
  },

  innerContainer: {
    height: 80,
    width: 80,
    backgroundColor: '#ccc'
  }
};

export { ListThumbnail };