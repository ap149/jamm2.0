import React from 'react';
import {View, Text} from 'react-native';

const ChatAutoMsg = ({body}) => {
  const {
    outerContainer,
    innerContainer,
    textStyle
  } = styles;

  return (
    <View style={outerContainer}>
      <View style={innerContainer}>
        <Text style={textStyle}>{body}</Text>
      </View>
    </View>
  )
}

const styles = {
  outerContainer: {
    paddingHorizontal: 42,
    paddingVertical: 12,
    alignItems: 'center',
  },

  innerContainer: {
    backgroundColor: '#eee',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8
  },

  textStyle: {
    fontSize: 11,
    fontWeight: '400',
  }
}

export { ChatAutoMsg };