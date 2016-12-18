import {
  PUSH_MESSAGE,
  UPDATE_STATUS,
  RESET_EVENT_INFO,
  SET_STATUS_LOADING,
  UPDATE_EVENT_NAME,
  ADD_ICON,
  TOGGLE_CONTACT,
  UPDATE_NEW_GROUP_NAME,
  PROMPT_DATES
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
  newGroupName: false
};

toggleUser = function(contacts, contactIndex){
  const index = contacts.indexOf(contactIndex);
  let newContacts = contacts;
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
      let newMessageArray = state.messages;
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
      let newContacts = toggleUser(state.contacts, action.payload);
      return Object.assign(
        {},
        state,
        {contacts: newContacts}
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
    default:
      return state;
  }
};