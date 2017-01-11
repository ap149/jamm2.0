import * as _ from 'lodash';
import {
  PUSH_MESSAGE,
  UPDATE_STATUS,
  RESET_EVENT_INFO,
  SET_STATUS_LOADING,
  UPDATE_EVENT_NAME,
  ADD_ICON,
  RESET_CONTACTS_SELECTED,
  TOGGLE_CONTACT,
  SET_CONTACTS_SELECTED,
  UPDATE_NEW_GROUP_NAME,
  PROMPT_DATES,
  TOGGLE_DATE,
  START_TIME,
  END_TIME,
  REMOVE_DATE,
  CLEAR_DATES,
  SET_DATES_SELECTED,
  SET_LOCATION
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
  contactObjs: [],
  contactsSelected: false,
  newGroupName: false,
  dates: [],
  datesSelected: false,
  location: null,
  locationSelected: false
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
    case RESET_CONTACTS_SELECTED:
      return Object.assign(
        {},
        state,
        {contacts: []}
      );
    case TOGGLE_CONTACT:
      const indexBefore = state.contacts.indexOf(action.payload.contactIndex);
      const newContacts = _.xor(state.contacts, [action.payload.contactIndex]);
      const indexAfter = newContacts.indexOf(action.payload.contactIndex);
      let newContactObjs = state.contactObjs.slice();
      if (indexBefore != -1){
        newContactObjs.splice(indexBefore, 1);
      } else {
        newContactObjs.splice(indexAfter, 0, action.payload.contactObj)
      }
      return Object.assign(
        {},
        state,
        {contacts: newContacts},
        {contactObjs: newContactObjs}
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
    case SET_LOCATION:
      return Object.assign(
        {},
        state,
        {location: action.payload},
        {locationSelected: true}
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