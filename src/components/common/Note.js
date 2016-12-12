import React from 'react';
import { View, Text } from 'react-native';
import { Colours, Fonts } from '../styles'

const Note = ({ children }) => {
  const { container, text } = styles;

  return (
    <View style={container}>
      <Text style={text}>
        {children}
      </Text>
    </View>
  );
};

const styles = {
  container: {
    // height: 100,
    // width: 100
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20
  },
  text: {
    // fontSize: 42,
    // color: Colours.note
    textAlign: 'center',
    lineHeight: 18
  }
};

export { Note };