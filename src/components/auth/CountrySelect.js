import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Meteor from 'react-native-meteor';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colours } from '../../components/styles';

class Enter extends Component {
  constructor() {
    super();

  }

  render() {
    const {
      outerContainer, 
      noteContainer
    } = styles

    return (
      <View style={outerContainer}>
        <View style={noteContainer}>
          <Note>We need to verify your phone. Please select your country, enter your number and tap 'Send Code'.</Note>
        </View>
      </View>
    )
  }
}

const styles = {
  outerContainer: {

  },
  
  noteContainer: {

  }
}

export default Enter;