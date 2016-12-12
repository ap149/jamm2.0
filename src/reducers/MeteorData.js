import Meteor from 'react-native-meteor';
import { LOGGED_IN } from '../actions/types';

const INITIAL_STATE = {
  items: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGGED_IN:
      console.log('logged in - yes!');
      return Object.assign({}, state, { 
        user: action.items
      });
    default:
      return state;
  }
};
