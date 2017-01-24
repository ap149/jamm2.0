import {
  SET_EVENT_ID
} from '../actions/types';

const INITIAL_STATE = {
  eventId: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_EVENT_ID:
      return Object.assign(
        {},
        state,
        {eventId: action.payload},
      );
    default:
      return state;
  }
};