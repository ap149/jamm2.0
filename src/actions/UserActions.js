import Meteor from 'react-native-meteor';
import { Actions } from 'react-native-router-flux';
import {
  CREATE_USER,
  UPDATE_NAME,
  LOAD_USER
} from './types';

const versionNumber = 2;
const userStatus = 2;




export const loadUser = (userObj) => {
  return {
    type: LOAD_USER,
    payload: userObj
  };
};