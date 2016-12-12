import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CardRowButton = ({children}) => {
  const {
    outerContainer
  } = styles;

  return (
    <TouchableOpacity 
      style={outerContainer}
      onPress={()=>console.log('pressed')}
    >
      <View>
      </View>
      <Icon name={children} size={18} color="#bbb" />
    </TouchableOpacity>
  )
}

const styles = {
  outerContainer: {

    // borderColor: 'green',
    // borderWidth: 1  
  }
}

export default CardRowButton;
