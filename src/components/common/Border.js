import React from 'react';
import { View } from 'react-native';
import { Colours } from '../styles'

const Border = ({shadow}) => {
  const { container, containerShadow } = styles;

  return (
    <View 
      style={shadow ? containerShadow : container}
    />
  );
};

const styles = {
  container: {
    borderColor: '#ccc',
    borderWidth: 0.5
  },

  containerShadow: {
    borderWidth: 0.5,    
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,    
  }

};

export { Border };