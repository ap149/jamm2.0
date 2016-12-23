import * as _ from 'lodash';
import {
  PUSH_MESSAGE,
  UPDATE_STATUS,
  RESET_EVENT_INFO,
  SET_STATUS_LOADING,
  UPDATE_EVENT_NAME,
  ADD_ICON,
  TOGGLE_CONTACT,
  SET_CONTACTS_SELECTED,
  UPDATE_NEW_GROUP_NAME,
  PROMPT_DATES,
  TOGGLE_DATE
} from '../actions/types';

const INITIAL_STATE = {
  createMode: true,
  messages: [],
  eventName: '',
  arrangedBy: '',
  imgUrl: false,
  iconName: false,
  status: 'init',
  contacts: [],
  contactsSelected: false,
  newGroupName: false,
  dates: []
};

toggleUser = function(contacts, contactIndex){
  const index = contacts.indexOf(contactIndex);
  let newContacts = contacts.slice();
  if (index == -1){
    newContacts.push(contactIndex);
    return newContacts;
  }
  newContacts.splice(index, 1);
  return newContacts;
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_EVENT_INFO:
      console.log('reseeting');
      return Object.assign(
        {},
        state,
        {createMode: true},
        {messages: []},
        {eventName: ''},
        {arrangedBy: ''},
        {imgUrl: false},
        {iconName: false},
        {status: 'init'},
        {contacts: []},
        {contactsSelected: false},
        {newGroupName: false}
      );    
    case PUSH_MESSAGE:
      let newMessageArray = state.messages.slice();
      newMessageArray.unshift(action.payload);
      return Object.assign(
        {},
        state,
        {messages: newMessageArray},
      );
    case UPDATE_STATUS:
      return Object.assign(
        {},
        state,
        {status: action.payload},
      );
    case SET_STATUS_LOADING:
      return Object.assign(
        {},
        state,
        {status: 'loading'},
      );
    case UPDATE_EVENT_NAME:
      return Object.assign(
        {},
        state,
        {eventName: action.payload.eventName},
        {arrangedBy: action.payload.arrangedBy},
      );
    case ADD_ICON:
      console.log("caught");
      console.log(action.payload);
      return Object.assign(
        {},
        state,
        {iconName: action.payload}
      );
    case TOGGLE_CONTACT:
      const newContacts = _.xor(state.contacts, [action.payload]);
      console.log(newContacts);
      return Object.assign(
        {},
        state,
        {contacts: newContacts}
      );
    case SET_CONTACTS_SELECTED:
      return Object.assign(
        {},
        state,
        {contactsSelected: true}
      );
    case UPDATE_NEW_GROUP_NAME:
      return Object.assign(
        {},
        state,
        {newGroupName: action.payload}
      );
    case PROMPT_DATES:
      return Object.assign(
        {},
        state,
        {status: 'prompt_dates'}
      );    
    case TOGGLE_DATE:
      const daysFromToday = action.payload;
      let newDates = state.dates.slice();
      let index = -1;
      for (i=0; i<newDates.length; i++){
        if (newDates[i].daysFromToday == daysFromToday){
          index = newDates[i].startTime === null ? i : -1;
          break;
        }
      }
      if (index != -1){
        newDates.splice(i,1);  
      } else {
        let dateObj = {};
        dateObj.daysFromToday = daysFromToday;
        dateObj.startTime = null;
        dateObj.endTime = null;
        newDates.push(dateObj);
      }
      newDates = _.orderBy(newDates, ['daysFromToday'], ['asc']);
      let counter = 0;
      newDates.map(function(obj){
        obj.index = counter;
        counter ++;
      })
      // console.log(newDates);
      return Object.assign(
        {},
        state,
        {dates: newDates}
      );      
    default:
      return state;
  }
};