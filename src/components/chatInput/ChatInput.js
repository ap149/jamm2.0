import React, { Component } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colours } from '../styles';

class ChatInput extends Component {
  constructor(){
    super();
    this.state = {
      inputValue: ''
    }
  }

  render(){
    const {
      containerStyle,
      inputStyle,
      leftLableStyle,
      buttonContainer
    } = styles;

    return (
      <View style={containerStyle}>
        <Text style={leftLableStyle}>
          {this.props.leftLabel}
        </Text>
        <AutoGrowingTextInput
          style={inputStyle}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          autoFocus={this.props.autoFocus}
          autoCapitalze={this.props.autoCapitalize ? this.props.autocapitalize : "sentences"}
          multiline={!this.props.singleLine}
          keyboardType={this.props.numeric ? 'numeric' : 'default'}
        />
        <TouchableOpacity
          style={buttonContainer}
          onPress={this.props.onSend}
          disabled={this.props.disabled}
        >
          <Icon name={this.props.icon} size={38} color={this.props.disabled ? Colours.appDisabled : Colours.app} />
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = {
  containerStyle: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'flex-end',
    // backgroundColor: '#f4f4f4'
  },

  inputStyle: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    marginTop: 4,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 2,
    maxHeight: 149,
  },

  leftLableStyle: {
    fontSize: 14,
    lineHeight: 14,
    marginTop: 4,
    paddingTop: 4,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 2,
  },

  buttonContainer: {
    minHeight: 46,
    paddingHorizontal: 12,
    justifyContent: 'center',   
  }
};

export default ChatInput;