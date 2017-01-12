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
    }, 650);
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

export const msg = {
  SKIP: 'Not right now.',
  PROMPT_CONTACTS: 'Next select who you want to invite.',
  NEW_GROUP_NAME: 'If you want to save these contacts as a group, enter a name below. Otherwise tap choose dates.',
  INVITES_UPDATED: 'Invites updated',
  GROUP_SAVED: "Ok. This will be a shared group that everyone in it can use. You are the only admin. Do you want to change any settings or start choosing dates?",
  PROMPT_DATES: "Ok. Next suggest dates for the event.",
  PROMPT_LOCATION: "Do you want to enter a venue for the event?",
  READY_ADD_MESSAGE: 
    "Your invitation is ready to send." +
    " Change any options above." +
    " Add a message below if you like."
  
}