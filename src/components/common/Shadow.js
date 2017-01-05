import React from 'react';
import { View } from 'react-native';
import { Colours } from '../styles'

const Shadow = () => {
  const {containerShadow } = styles;

  return (
    <View 
      style={containerShadow}
    />
  );
};

const styles = {
  container: {
    borderColor: '#ccc',
    borderWidth: 0.5
  },

  containerShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,    
  }

};

export { Shadow };