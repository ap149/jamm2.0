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

export const delayDefault = () => {
  let promise = new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve();
    }, 1000);
  })
  return promise;
}


export const createBotMessage = (body) => {
  return {
    type: 'text',
    fromType: 'bot',
    fromObj: {userId: null},
    body: body,
  }
}

export const createUserMessage = (userId, body) => {
  return {
    type: 'text',
    fromType: 'user',
    fromObj: {userId: userId},
    body: body,
  }
}

export const createAutoMessage = (body) => {
  return {
    type: 'text',
    fromType: 'auto',
    fromObj: {userId: null},
    body: body,
  }
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