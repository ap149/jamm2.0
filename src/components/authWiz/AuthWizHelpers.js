export const STATUS = {
  INIT: 'init',
  ENTER_CODE: 'enter_code',
  ENTER_NAME: 'enter_name',
  COMPLETE: 'complete'
}

export const MESSAGE = {
  INIT_MESSAGE: `Please enter your number below so we can send you a verification code.`,
  SEND_CODE_ERROR: `That didn't work. Please check your number and try again.`,
  CODE_VERIFIED: `Great. Last step - please tell us your name.`,
  COMPLETE: 'Done! Tap below to start using Jamm.'
}

export const msgSentCode = (number) => {
  return `We have sent an SMS to +${number} containing a 4-digit code. Enter that below.`
}