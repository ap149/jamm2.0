import React from 'react';
import {View, Text} from 'react-native';

const ChatAutoMsg = ({body}) => {
  const {
    container,
    textStyle
  } = styles;

  return (
    <View style={container}>
      <Text style={textStyle}>{body}</Text>
    </View>
  )
}

const styles = {
  container: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center'
  },

  textStyle: {
    fontSize: 11,
    fontWeight: '400',
  }
}

export { ChatAutoMsg };