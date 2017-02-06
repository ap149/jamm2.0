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

// export const initMsg = (name) => {
//   const msg = `Hi ${name} - let's set up a new event. What are you organising?`;
//   return createBotMessage(msg);
// }
export const initMsg = (eventName) => {
  const msg = `ok. Change the event title anytime by tapping at the top. Who do you want to invite?`;
  return createBotMessage(msg);
}


export const msg = {
  INIT_1: "Change the event title anytime by tapping at the top.",
  INIT_2: "Who do you want to invite?",
  SKIP: 'Not right now.',
  PROMPT_CONTACTS: 'Next select who you want to invite.',
  NEW_GROUP_NAME: 'You can save the group if you like. Otherwise choose dates for the event.',
  INVITES_UPDATED: 'Invites updated',
  GROUP_SAVED: "Ok. This will be a shared group that everyone in it can use. You are the only admin. Do you want to change any settings or start choosing dates?",
  PROMPT_DATES: "Ok. Next suggest dates for the event.",
  PROMPT_LOCATION: "Do you want to enter a venue for the event?",
  READY_ADD_MESSAGE: 
    "Your invitation is ready to send." +
    " Change any options above." +
    " Add a message below if you like."
}