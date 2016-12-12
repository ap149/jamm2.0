import React, { Component } from 'react';
import { View, Keyboard, LayoutAnimation } from 'react-native';
import { ChatOptionContainer } from '../chatInput/ChatOptionContainer'
import ChatOption from '../chatInput/ChatOption'
import { connect } from 'react-redux';
import { addIcon } from '../../actions';
import EventWizMethods from './EventWizMethods';

class EventImage extends Component {
  chooseIcon(){
    this.props.addIcon('glass');
    EventWizMethods.promptChooseInvites(true);    
  }

  skip(){
    EventWizMethods.promptChooseInvites(true);
  }

  render(){
    return (
      <ChatOptionContainer>
        <ChatOption
          label="Change icon"
          icon="picture-o"
          onPress={this.chooseIcon.bind(this)}
        />
        <ChatOption
          label="Select photo"
          icon="camera"
        />
        <ChatOption
          label="Skip"
          // icon="times"
          onPress={this.skip.bind(this)}
        />        
      </ChatOptionContainer>
    );
  }
};

const mapStateToProps = (state) => {
  const { imgUrl, iconName } = state.eventInfo;

  return { imgUrl };
};

export default connect(mapStateToProps, { addIcon })(EventImage);