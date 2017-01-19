
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import Meteor, { createContainer } from 'react-native-meteor';
import reducers from './reducers';
import RouterComponent from './Router';
import store from 'react-native-simple-store';

// const SERVER_URL = 'ws://192.168.0.6:3000/websocket';
const SERVER_URL = 'ws://localhost:3000/websocket';

class JammApp extends Component {
  constructor(){
    super();
    Meteor.connect(SERVER_URL);
    // store.delete('jammUser');
  }


  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    )
  }
}

export default JammApp;
