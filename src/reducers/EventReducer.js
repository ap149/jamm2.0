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
  TOGGLE_DATE,
  START_TIME,
  END_TIME,
  REMOVE_DATE,
  CLEAR_DATES,
  SET_DATES_SELECTED
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
  dates: [],
  datesSelected: false
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

findDateIndex = function(dates, index){
  for (i=0; i<dates.length; i++){
    if (dates[i].index == index){
      return i;
    }
  }
  return -1;  
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_EVENT_INFO:
      console.log('reseeting');
      return Object.assign(
        {},
        INITIAL_STATE
        // state,
        // {createMode: true},
        // {messages: []},
        // {eventName: ''},
        // {arrangedBy: ''},
        // {imgUrl: false},
        // {iconName: false},
        // {status: 'init'},
        // {contacts: []},
        // {contactsSelected: false},
        // {newGroupName: false},
        // {dates: []},
        // {datesSelected: false}        
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
        const index = newDates.length === 0 ? 0 : _.max(_.map(newDates, 'index')) + 1;
        let dateObj = {};
        dateObj.daysFromToday = daysFromToday;
        dateObj.startTime = null;
        dateObj.endTime = null;
        dateObj.index = index;
        newDates.push(dateObj);
      }
      newDates = _.orderBy(newDates, ['daysFromToday'], ['asc']);
      console.log(newDates);
      return Object.assign(
        {},
        state,
        {dates: newDates}
      );   
    case REMOVE_DATE:
      let datesRemoved = state.dates.slice();
      let removeIndex = findDateIndex(datesRemoved, action.payload);
      datesRemoved.splice(removeIndex, 1);
      return Object.assign(
        {},
        state,
        {dates: datesRemoved}
      );
    case START_TIME:
      let startTimeAdded = state.dates.slice();
      let startTimeIndex = findDateIndex(startTimeAdded, action.payload.index);
      startTimeAdded[startTimeIndex].startTime = action.payload.time;
      console.log(startTimeIndex, action.payload.index);
      return Object.assign(
        {},
        state,
        {dates: startTimeAdded}
      );
    case END_TIME:
      let endTimeAdded = state.dates.slice();
      let endTimeIndex = findDateIndex(endTimeAdded, action.payload.index);
      endTimeAdded[endTimeIndex].endTime = action.payload.time;
      return Object.assign(
        {},
        state,
        {dates: endTimeAdded}
      );
    case SET_DATES_SELECTED:
      return Object.assign(
        {},
        state,
        {datesSelected: true}
      )
    case CLEAR_DATES:
      return Object.assign(
        {},
        state,
        {dates: []}
      )      
    default:
      return state;
  }
};