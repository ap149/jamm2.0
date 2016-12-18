import Meteor from 'react-native-meteor';
import { Actions } from 'react-native-router-flux';
import {
  PUSH_MESSAGE,
  UPDATE_STATUS,
  RESET_EVENT_INFO,
  SET_STATUS_LOADING,
  UPDATE_EVENT_NAME,
  ADD_ICON,
  TOGGLE_CONTACT,
  UPDATE_NEW_GROUP_NAME,
  PROMPT_DATES
} from './types';

export const pushMessage = (msgObj) => {
  return {
    type: PUSH_MESSAGE,
    payload: msgObj
  }
}

export const updateStatus = (str) => {
  return {
    type: UPDATE_STATUS,
    payload: str
  }
}

export const updateEventName = (obj) => {
  return {
    type: UPDATE_EVENT_NAME,
    payload: obj
  }
}

export const resetEventInfo = () => {
  return {
    type: RESET_EVENT_INFO
  }
}

export const addIcon = (iconName) => {
  return {
    type: ADD_ICON,
    payload: iconName
  }
}

export const toggleContact = (contactIndex) => {
  return {
    type: TOGGLE_CONTACT,
    payload: contactIndex
  }
}

export const updateNewGroupName = (name) => {
  return {
    type: UPDATE_NEW_GROUP_NAME,
    payload: name
  }
}

export const promptDates = () => {
  return {
    type: PROMPT_DATES
  }
}

export const setStatusLoading = () => {
  return {
    type: SET_STATUS_LOADING
  }
}