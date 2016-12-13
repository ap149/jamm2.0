let botMessage = {
  type: 'text',
  fromType: 'bot',
  fromObj: {userId: null},
  body: ''
}

let userMessage = {
  type: 'text',
  fromType: 'user',
  fromObj: {userId: null},
  body: '',
}

export const CHATBOT_DELAY = 1000;

export const createBotMessage = (body) => {
  const msg = Object.assign({}, botMessage);
  msg.body = body;
  return msg;
}

export const createUserMessage = (userId, body) => {
  const msg = Object.assign({}, userMessage);
  msg.body = body;
  msg.fromObj.userId = userId;
  return msg;
}

export const initMsg = (name) => {
  const msg = `Hi ${name} - let's set up a new event. What are you organising?`;
  return createBotMessage(msg);
}

export const chooseImageMessage = (eventName) => {
  return `Do you want to add an image or change the icon above for ${eventName}?`;
}

export const skipMessage = 'Not right now';
export const chooseContacts = 'Next select who you want to invite.';
export const msg = {
  NEW_GROUP_NAME: 'If you want to save these contacts as a group, enter a name below. Otherwise skip to choose dates.'
}