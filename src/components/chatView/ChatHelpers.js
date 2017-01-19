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

export const createUserMessage = (userObj, body) => {
  return {
    type: 'text',
    fromType: 'user',
    fromObj: userObj,
    body: body,
    created: new Date()
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
