import React from 'react';
import { View } from 'react-native';
import { Colours } from '../styles'

const Border = () => {
  const { container } = styles;

  return (
    <View style={container} />
  );
};

const styles = {
  container: {
    borderColor: '#ccc',
    borderWidth: 0.5
  }
};

export { Border };