import Meteor from 'react-native-meteor';
import { Actions } from 'react-native-router-flux';
import {
  INIT,
  UPDATE_AUTH_STATUS,
  PUSH_AUTH_MESSAGE,
  CHOOSE_COUNTRY,
  ENTER_PHONENUMBER
} from './types';

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