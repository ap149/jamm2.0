import React from 'react';
import { View } from 'react-native';
import { Border } from '../common';

const EventInfoItem = ({children}) => {
  const { container } = styles;

  return (
    <View style={container}>
      {children}
      <Border />
    </View>
  );
}

const styles = {
  container: {
    borderWidth: 1,
    borderColor: 'green'
  }
}

export { EventInfoItem }