import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ActionButton = ({children}) => {
  const {
    outerContainer
  } = styles;

  return (
    <TouchableOpacity 
      style={outerContainer}
      onPress={()=>console.log('pressed')}
    >
      <Text>{children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = {
  outerContainer: {

    // borderColor: 'green',
    // borderWidth: 1  
  }
}

export default ActionButton;
