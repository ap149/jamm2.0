import {
  CREATE_USER,
  UPDATE_NAME,
  LOAD_USER
} from '../actions/types';

const INITIAL_STATE = {
  userId: '',
  displayName: '',
  countryCode: '',
  phoneNumber: '',
  appVersion: '',
  status: '',
  userObj: {}
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
      let loadedUserObj = {
        userId: action.payload.userId,
        displayName: action.payload.displayName
      }
      return Object.assign(
        {},
        state,
        {userId: action.payload.userId},
        {countryCode: action.payload.countryCode},
        {phoneNumber: action.payload.phoneNumber},
        {displayName: action.payload.displayName},
        {appVersion: action.payload.appVersion},
        {status: action.payload.status},
        {userObj: loadedUserObj}        
      );
    default:
      return state;
  }
};