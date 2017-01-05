import React from 'react';
import { View } from 'react-native';
import { Colours } from '../styles'

const Border = ({alt}) => {
  const {
    borderDefault,
    borderAlt
  } = styles;

  return (
    <View 
      style={alt ? borderAlt : borderDefault}
    />
  );
};

const styles = {
  borderDefault: {
    borderColor: '#ccc',
    borderWidth: 0.5
  },

  borderAlt: {
    borderColor: '#fff',
    borderWidth: 0.25
  }

};

export { Border };