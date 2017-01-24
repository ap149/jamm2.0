import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import NewEventReducer from './NewEventReducer';
import EventReducer from './EventReducer';

export default combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  newEventInfo: NewEventReducer,
  eventInfo: EventReducer
});

