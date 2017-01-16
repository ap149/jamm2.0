import Meteor from 'react-native-meteor';
import { Actions } from 'react-native-router-flux';
import {
  INIT,
  UPDATE_AUTH_STATUS,
  PUSH_AUTH_MESSAGE,
  CHOOSE_COUNTRY,
  ENTER_PHONENUMBER,
  UPDATE_NAME
} from './types';

const versionNumber = 2;
const userStatus = 2;

export const updateAuthStatus = (status) => {
  return {
    type: UPDATE_AUTH_STATUS,
    payload: status
  }
}

export const pushAuthMessage = (msgObj) => {
  return {
    type: PUSH_AUTH_MESSAGE,
    payload: msgObj
  }
}

export const chooseCountry = () => {
  return {
    type: CHOOSE_COUNTRY
  }
}

export const enterPhonenumber = (number) => {
  return {
    type: ENTER_PHONENUMBER,
    payload: number
  }
}

export const updateName = (userId, displayName) => {
  return (dispatch) => {
    Meteor.call('updateName', displayName, versionNumber, userStatus, (err, res) => {
      if (res){
        dispatch({type: UPDATE_NAME, payload: res});
        // Actions.drawer({type: 'reset'});
      }
    });
  }
}