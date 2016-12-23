import React, { Component } from 'react';
import { TouchableOpacity, LayoutAnimation, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Border } from '../common';
import { Colours, Fonts } from '../styles';

class ChatInfoItem extends Component {
  constructor(props){
    super();
  }

  componentWillUpdate(){
    // LayoutAnimation.spring();
  }

  render(){
    const {
      infoContainer,
      iconContainer,
      inviteInfoContainer,
      itemTextButton,
      textButtonText
    } = styles;
    return (
      <View>
        <View style={infoContainer}>
          <View style={iconContainer}>
            <Icon name={this.props.iconName} size={16} color={Colours.iconShade}/>
          </View>
          <View style={inviteInfoContainer}>
            {this.props.children}
          </View>
          <TouchableOpacity style={itemTextButton} onPress={this.props.onPress}>
            <Text style={textButtonText}>{this.props.buttonText}</Text>
          </TouchableOpacity>             
        </View>
        <Border />
      </View>
    )
  }
}

const styles = {
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: Colours.navBarBack
  },

  iconContainer: {
    width: 40,
    minHeight: 40,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  inviteInfoContainer: {
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    flex: 1
  },

  itemTextButton: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    justifyContent: 'center',
  },

  textButtonText: {
    color: Colours.app,
    fontSize: 12    
  }
}

export default ChatInfoItem;
