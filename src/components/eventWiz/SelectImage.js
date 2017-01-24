import React, { Component } from 'react';
import { View, Keyboard, LayoutAnimation } from 'react-native';
import { ChatOptionContainer } from '../chatInput/ChatOptionContainer'
import ChatOption from '../chatInput/ChatOption'
import { connect } from 'react-redux';
import { addIcon, updateStatus, pushMessage } from '../../actions';
import * as EventWizHelpers from './EventWizHelpers';
import { EventStatus } from './EventStatus';

class SelectImage extends Component {
  chooseIcon(){
    this.props.addIcon('glass');
    // EventWizMethods.promptChooseInvites(true);    
  }

  skip(){
    const msg = Object.assign({}, EventWizHelpers.createUserMessage(this.props.userId, EventWizHelpers.skipMessage));
    this.props.pushMessage(msg);
    this.props.updateStatus(false);
    let _this = this;
    setTimeout(function() {
      const msg = Object.assign({}, EventWizHelpers.createBotMessage(EventWizHelpers.chooseContacts));
      _this.props.pushMessage(msg);
      _this.props.updateStatus(EventStatus.INVITES);          
    }, EventWizHelpers.CHATBOT_DELAY);
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
  const { userId } = state.user;
  const { imgUrl, iconName } = state.newEventInfo;

  return { userId, imgUrl };
};

export default connect(mapStateToProps, { addIcon, updateStatus, pushMessage })(SelectImage);