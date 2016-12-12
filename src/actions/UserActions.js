import Meteor from 'react-native-meteor';
import { Actions } from 'react-native-router-flux';
import {
  CREATE_USER,
  UPDATE_NAME,
  LOAD_USER
} from './types';

const versionNumber = 2;
const userStatus = 2;

export const createUser = (newUser) => {
  return {
    type: CREATE_USER,
    payload: newUser
  }
}

export const updateName = (userId, displayName) => {
  return (dispatch) => {
    Meteor.call('updateName', displayName, versionNumber, userStatus, (err, res) => {
      if (res){
        dispatch({type: UPDATE_NAME, payload: res});
        Actions.drawer({type: 'reset'});
      }
    });
  }
}

export const loadUser = (userObj) => {
  return {
    type: LOAD_USER,
    payload: userObj
  };
};