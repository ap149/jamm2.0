import Meteor, { Accounts } from 'react-native-meteor';
import { METEOR_CONNECT } from './types';

export const meteorConnect = (status) => {
  return () => {
    meteorConnect()
    .then((res) => {
      console.log(res);
      console.log(Meteor.user());
      dispatch({type: AUTH_CHECK});
      Action.requestCode();
    }, (err) => {
      dispatch({type: AUTH_CHECK});
      Action.requestCode();
    })
  }
}

const meteorConnect = () => {
  return new Promise((resolve, reject) => {
    console.log("connecting");
    // console.log(Meteor.user());
    // resolve(Meteor.connect(SERVER_URL));
    resolve();
  })
}