import {
  UPDATE_EVENT_NAME
} from '../actions/types';

const INITIAL_STATE = {
  eventName: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_EVENT_NAME:
      return Object.assign(
        {},
        state,
        {eventName: action.payload}
      );
    default:
      return state;
  }
};