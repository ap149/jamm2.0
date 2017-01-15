export const STATUS = {
  INIT: 'init',
  ENTER_CODE: 'enter_code'
}

export const MESSAGE = {
  INIT_MESSAGE: `Please enter your number below so we can send you a verification code.`,
  SEND_CODE_ERROR: `Oops, something went wrong. Please check your number and try again.`
}

export const msgSentCode = (number) => {
  return `We have sent an SMS to +${number} containing a 4-digit code. Enter that below.`
}