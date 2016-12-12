import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RowButtonIcon = ({children}) => {
  const {
    outerContainer
  } = styles;

  return (
    <View style={outerContainer}>
      <Icon name={children} size={18} color="#bbb" />
    </View>
  )
}

const styles = {
  outerContainer: {
    width: 60,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default RowButtonIcon;
