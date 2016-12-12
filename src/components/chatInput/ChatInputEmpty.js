import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const ChatInputEmpty = ({loading, children}) => {
  return (
    <View style={styles.containerStyle}>
      {loading ? <ActivityIndicator /> : <View/>}
      <Text style={styles.textStyle}>{children}</Text>
    </View>
  );
}

const styles = {
  containerStyle: {
    height: 42,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    color: '#666'
  }
}

export { ChatInputEmpty }