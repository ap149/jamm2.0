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

  renderButton(){
    const {
      itemTextButton,
      textButtonText,
      itemArrowButton
    } = styles;

    if (this.props.buttonText){
      return (
        <View style={itemTextButton}>
          <Text style={textButtonText}>{this.props.buttonText}</Text>
        </View>
      )   
    }
    if (this.props.buttonArrow){
      return (
        <View style={itemArrowButton}>
          <Icon name="chevron-right" size={20} color={Colours.iconShade}/>
        </View>
      )         
    }
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
        <TouchableOpacity style={infoContainer} onPress={this.props.onPress}>
          <View style={iconContainer}>
            <Icon name={this.props.iconName} size={16} color={Colours.iconShade}/>
          </View>
          <View style={inviteInfoContainer}>
            {this.props.children}
          </View>
          {this.renderButton()}          
        </TouchableOpacity>
        <Border />
      </View>
    )
  }
}

const styles = {
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: Colours.appMain
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
    color: '#fff',
    fontSize: 12    
  },

  itemArrowButton: {
    justifyContent: 'center',
    paddingHorizontal: 12
  }
}

export default ChatInfoItem;
