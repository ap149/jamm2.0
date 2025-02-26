import Meteor from 'react-native-meteor';
import { Actions } from 'react-native-router-flux';
import {
  PUSH_MESSAGE,
  UPDATE_STATUS,
  RESET_EVENT_INFO,
  SET_STATUS_LOADING,
  UPDATE_EVENT_NAME,
  CHANGE_ICON,
  RESET_CONTACTS_SELECTED,
  TOGGLE_CONTACT,
  SET_CONTACTS_SELECTED,
  UPDATE_NEW_GROUP_NAME,
  PROMPT_DATES,
  TOGGLE_DATE,
  START_TIME,
  END_TIME,
  REMOVE_DATE,
  CLEAR_DATES,
  SET_DATES_SELECTED,
  SET_LOCATION,
  INVITATION_MESSAGE
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

export const changeIcon = (iconName) => {
  return {
    type: CHANGE_ICON,
    payload: iconName
  }
}

export const resetEventInfo = () => {
  return {
    type: RESET_EVENT_INFO
  }
}

export const resetContactsSelected = () => {
  return {
    type: RESET_CONTACTS_SELECTED
  }
}

export const toggleContact = (contactIndex, contactObj) => {
  return {
    type: TOGGLE_CONTACT,
    payload: {
      contactIndex: contactIndex,
      contactObj: contactObj
    }
  }
}

export const setContactsSelected = () => {
  return {
    type: SET_CONTACTS_SELECTED
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

export const toggleDate = (daysFromNow) => {
  return {
    type: TOGGLE_DATE,
    payload: daysFromNow
  }
}

export const removeDate = (index) => {
  return {
    type: REMOVE_DATE,
    payload: index
  }
}

export const setStartTime = (index, time) => {
  return {
    type: START_TIME,
    payload: {index, time}
  }
}

export const setEndTime = (index, time) => {
  return {
    type: END_TIME,
    payload: {index, time}
  }
}

export const setDatesSelected = () => {
  return {
    type: SET_DATES_SELECTED
  }
}

export const clearDates = () => {
  return {
    type: CLEAR_DATES
  }
}

export const setLocation = (location) => {
  return {
    type: SET_LOCATION,
    payload: location
  }
}

export const setStatusLoading = () => {
  return {
    type: SET_STATUS_LOADING
  }
}

export const invitationMessage = (msgObj) => {
  return {
    type: INVITATION_MESSAGE,
    payload: msgObj
  }
}