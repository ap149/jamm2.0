import React, { Component } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colours } from '../styles';

class ChatOption extends Component {

  componentWillMount(){
    // LayoutAnimation.spring();
  }

  iconColour(){
    if (this.props.inactive){
      return Colours.disabled;
    }
    if (this.props.active){
      return Colours.light;
    }
    return Colours.app
  }

  renderIcon(){
    const {
      iconStyle
    } = styles;

    if (this.props.icon){
      return (
        <Icon name={this.props.icon} size={12} color={this.iconColour()} style={iconStyle}/>
      )
    } else {
      return <View/>
    }
  }

  render(){
    const {
      outerContainer,
      innerContainerDefault,
      innerContainerBorderless,
      textDefault
    } = styles;

    return (
      <View style={outerContainer}>
        <TouchableOpacity 
          style={this.props.icon ? innerContainerDefault : innerContainerBorderless}
          onPress={this.props.onPress}
        >
          {this.renderIcon()}    
          <Text style={textDefault}>{this.props.label}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  outerContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  innerContainerDefault: {
    borderColor: Colours.appMain,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center'
  },

  innerContainerBorderless: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center'    
  },

  textDefault: {
    color: Colours.appMain,
    fontSize: 14
  },

  iconStyle: {
    paddingRight: 6
  }
}

export default ChatOption