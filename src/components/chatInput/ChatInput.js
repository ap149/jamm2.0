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
      buttonContainer
    } = styles;

    return (
      <View style={containerStyle}>
        <AutoGrowingTextInput
          style={inputStyle}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          autoFocus={true}
          autoCapitalze={this.props.autoCapitalize ? this.props.autocapitalize : "sentences"}
          multiline={!this.props.singleLine}
        />
        <TouchableOpacity
          style={buttonContainer}
          onPress={this.props.onSend}
          disabled={this.props.disabled}
        >
          <Icon name={this.props.icon} size={33} color={this.props.disabled ? Colours.appDisabled : Colours.app} />
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
  },

  inputStyle: {
    flex: 1,
    fontSize: 14,
    lineHeight: 16,
    marginTop: 4,
    paddingTop: 4,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 2,
    maxHeight: 149,
  },

  buttonContainer: {
    minHeight: 42,
    paddingHorizontal: 12,
    justifyContent: 'center',   
  }
};

export default ChatInput;