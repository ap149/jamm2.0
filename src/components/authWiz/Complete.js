import Meteor, { createContainer, MeteorComplexListView } from 'react-native-meteor';
import * as _ from 'lodash';

import store from 'react-native-simple-store';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { updateAuthStatus, pushAuthMessage } from '../../actions';

// import * as Helpers from '../common/Helpers';
// import * as AuthWizHelpers from './AuthWizHelpers';
// import * as ChatHelpers from '../chatView/ChatHelpers';

import React, { Component } from 'react';
import { 
  View, 
} from 'react-native';

import { ChatOptionContainer } from '../chatInput/ChatOptionContainer'
import ChatInput from '../chatInput/ChatInput'
import ChatOption from '../chatInput/ChatOption'

class Complete extends Component {

  done(){
    console.log("done");
    Actions.drawer({type: 'reset'});
  }

  render(){
    return (
      <View>
        <ChatOptionContainer>
          <ChatOption
            label="Start"
            icon="calendar"
            onPress={this.done.bind(this)}
          />
        </ChatOptionContainer>
      </View>
    );
  }
};

export default connect(null, {  })(Complete);