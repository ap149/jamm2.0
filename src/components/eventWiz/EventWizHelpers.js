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
  botMessage.body = body;
  return botMessage;
}

export const createUserMessage = (userId, body) => {
  userMessage.body = body;
  userMessage.fromObj.userId = userId;
  return userMessage;
}

export const initMsg = (name) => {
  const msg = `Hi ${name} - let's set up a new event. What are you organising?`;
  return createBotMessage(msg);
}