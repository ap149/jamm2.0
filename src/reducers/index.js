import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import EventReducer from './EventReducer';

export default combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  eventInfo: EventReducer,
});

