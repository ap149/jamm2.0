import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { updateNewGroupName, updateStatus } from '../../actions';
import { ChatOptionContainer } from '../chatInput/ChatOptionContainer'
import ChatInput from '../chatInput/ChatInput'
import ChatOption from '../chatInput/ChatOption'

class EventNewGroupName extends Component {
  constructor(){
    super();
    this.state = {
      inputText: ''
    }
  }

  onEnterText(inputText){
    this.setState({inputText})
  }

  onSend(){
    this.props.updateNewGroupName(this.state.inputText);
    Keyboard.dismiss();
    this.props.updateStatus(false);
  }

  skip(){
    console.log(this.props.passedData);
  }

  render(){
    return (
      <View>
        <ChatInput
          placeholder="Enter a name to save this group..."
          autoCapitalize={true}
          icon="arrow-circle-right"
          value={this.state.inputText}
          onChangeText={this.onEnterText.bind(this)}
          onSend={this.onSend.bind(this)}
          disabled={this.state.inputText === ''}
        />      
        <ChatOptionContainer>
          <ChatOption
            label="Skip"
            onPress={this.skip.bind(this)}
          />
        </ChatOptionContainer>
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  const { contacts } = state.eventInfo;

  return { contacts };
};

export default connect(mapStateToProps, { updateNewGroupName, updateStatus })(EventNewGroupName);