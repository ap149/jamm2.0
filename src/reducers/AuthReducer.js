import {
  UPDATE_AUTH_STATUS,
  PUSH_AUTH_MESSAGE,
  ENTER_PHONENUMBER
} from '../actions/types';

const INITIAL_STATE = {
  status: false,
  messages: [],
  country: {countryName: 'United Kingdom', countryCode: '44'},
  phonenumber: null  
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
        {phonenumber: action.payload}
      )      
    default:
      return state;
  }
};