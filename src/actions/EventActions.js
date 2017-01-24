import Meteor from 'react-native-meteor';
import { Actions } from 'react-native-router-flux';
import {
  SET_EVENT_ID
} from './types';


export const setEventId = (eventId) => {
  return {
    type: SET_EVENT_ID,
    payload: eventId
  };
};