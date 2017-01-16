import {
  UPDATE_AUTH_STATUS,
  PUSH_AUTH_MESSAGE,
  ENTER_PHONENUMBER,
  UPDATE_NAME
} from '../actions/types';

const INITIAL_STATE = {
  appVersion: 2,
  userStatus: 2,
  status: false,
  messages: [],
  country: {countryName: 'United Kingdom', countryCode: '44'},
  phoneNumber: null  
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_AUTH_STATUS:
      return Object.assign(
        {},
        state,
        {status: action.payload}
      )
    case PUSH_AUTH_MESSAGE:
      let newMessageArray = state.messages.slice();
      newMessageArray.unshift(action.payload);
      return Object.assign(
        {},
        state,
        {messages: newMessageArray},
      );
    case ENTER_PHONENUMBER:
      return Object.assign(
        {},
        state,
        {phoneNumber: action.payload}
      )           
    default:
      return state;
  }
};