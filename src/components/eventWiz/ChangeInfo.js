import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as Helpers from '../common/Helpers';
import * as EventWizHelpers from './EventWizHelpers';
import { EventStatus } from '../eventWiz/EventStatus';
import { updateNewGroupName, updateStatus, pushMessage } from '../../actions';
import { ChatOptionContainer } from '../chatInput/ChatOptionContainer'
import ChatInput from '../chatInput/ChatInput'
import ChatOption from '../chatInput/ChatOption'

class ChangeInfo extends Component {

};

const mapStateToProps = (state) => {
  const { newGroupName } = state.user;

  return { newGroupName };
};

export default connect(mapStateToProps, { updateStatus })(ChangeInfo);