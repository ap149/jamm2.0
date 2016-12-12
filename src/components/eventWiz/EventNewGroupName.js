import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { ChatOptionContainer } from '../chatInput/ChatOptionContainer'
import ChatInput from '../chatInput/ChatInput'
import ChatOption from '../chatInput/ChatOption'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

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
          onSend={() => console.log("group name")}
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

export default connect(mapStateToProps, {  })(EventNewGroupName);