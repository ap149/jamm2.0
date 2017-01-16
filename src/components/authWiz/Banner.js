import React from 'react';
import { View, Text } from 'react-native';
import { Colours, Fonts } from '../styles';
import { Border } from '../common';
import ChatInfoItem from '../chatView/ChatInfoItem'

const Banner = () => {
  const {
    outerContainer,
    textContainer,
    welcomeMsgLarge,
    welcomeMsgSmall,
  } = styles;

  return (
    <View style={outerContainer}>
      <View style={textContainer}>
        <Text style={welcomeMsgLarge}>Jamm</Text>
        <Text style={welcomeMsgSmall}> </Text>        
        <Text style={welcomeMsgSmall}>Making plans has never been easier</Text>        
      </View>
      <ChatInfoItem
        iconName='info-circle'
        buttonArrow
        onPress={() => console.log("website")}
      >
        <Text style={Fonts.chatInfoSubheader}>Website</Text>
      </ChatInfoItem>      
      <ChatInfoItem
        iconName='eye-slash'
        buttonArrow
        onPress={() => console.log("privacy")}
      >
        <Text style={Fonts.chatInfoSubheader}>Privacy policy</Text>
      </ChatInfoItem>      
    </View>
  )
}

const styles = {
  outerContainer: {
    backgroundColor: Colours.appMain
  },

  textContainer: {
    backgroundColor: Colours.appDarkBack,
    paddingTop: 34,
    paddingHorizontal: 12,
    paddingBottom: 20
  },

  welcomeMsgLarge: {
    color: Colours.appLight,
    fontSize: 32,
    fontWeight: '500',
    lineHeight: 34,
    textAlign: 'center'
  },

  welcomeMsgSmall: {
    color: Colours.appLight,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center'
  }
}

export default Banner;
