import {
  CREATE_USER,
  UPDATE_NAME,
  LOAD_USER
} from '../actions/types';

const INITIAL_STATE = {
  userId: '',
  displayName: '',
  phoneNumber: '',
  appVersion: '',
  status: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_USER:
      return Object.assign(
        {},
        state,
        {userId: action.payload._id},
        {phoneNumber: action.payload.username}
      );
    case LOAD_USER:
      return Object.assign(
        {},
        state,
        {userId: action.payload.userId},
        {phoneNumber: action.payload.phoneNumber},
        {displayName: action.payload.displayName},
        {appVersion: action.payload.appVersion},
        {status: action.payload.status}        
      );
    default:
      return state;
  }
};