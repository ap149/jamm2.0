import React from 'react';
import { View, Text } from 'react-native';

const Divider = ({label}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label.toUpperCase()}</Text>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 12
  },

  text: {
    fontSize: 12,
    color: '#888'
  }

};

export { Divider };