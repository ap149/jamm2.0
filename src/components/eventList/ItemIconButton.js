import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ItemIconButton = ({children}) => {
  const {
    buttonContainer
  } = styles;

  return (
    <TouchableOpacity 
      style={buttonContainer}
      onPress={()=>console.log('pressed')}
    >
      <Icon name={children} size={18} color="#bbb" />
    </TouchableOpacity>
  )
}

const styles = {
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    marginRight: 8,
    // borderColor: 'green',
    // borderWidth: 1  
  }
}

export default ItemIconButton;
