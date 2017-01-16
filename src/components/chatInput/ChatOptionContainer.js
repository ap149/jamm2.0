import React from 'react';
import { View } from 'react-native';

const ChatOptionContainer = ({children}) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = {
  container: {
    minHeight: 42,
    paddingBottom: 12,
  }
}

export { ChatOptionContainer }