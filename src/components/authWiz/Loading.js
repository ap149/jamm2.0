import React, { Component } from 'react';
import { 
  View, 
  Text,
  ActivityIndicator,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { loadUser } from '../../actions';
import store from 'react-native-simple-store';
import Meteor, { createContainer } from 'react-native-meteor';
import { Actions } from 'react-native-router-flux';
import NavBar  from '../navBar/NavBar';
import { Colours, Fonts } from '../styles';

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  _handleConnect() {
    console.log("load user called");
    if (this.props.status.connected){
    // if (true){
      if (this.props.meteorUser){
        console.log("logged in");
        console.log(this.props.meteorUser.userProfile);
        this.props.loadUser(this.props.meteorUser.userProfile);
        Actions.drawer({type: 'reset'});
        return;
      } 
      store.get("jammUser")
      .then((storedUser) => {
        if (storedUser){
          console.log(storedUser);
          store.delete('jammUser');
          // Actions.auth({type: 'reset'});
          this._handleStoredUser(storedUser);
          return;
        } else {
          Actions.auth({type: 'reset'});
          console.log("no stored user");
          return;
        }
      })
    }
  }  

  _handleStoredUser(storedUser) {
    console.log("login stored user");
    return;
  }

  render() {
    this._handleConnect();
    const {
      innerContainer
    } = styles

    return (
      <View style={{flex: 1}}>
        <NavBar/>
        <View style={innerContainer}>
          <ActivityIndicator />
        </View>
      </View>
    )
  }
}

const styles = {
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: Colours.appDarkBack
  }
}

const LoadingConnected = createContainer(params=>{
  // if (Meteor.status().connected && !loading){
  //   loading = true;
  //   const isUser = (Meteor.userId() !== null);
  //   if (isUser){
  //     handleLoggedIn();
  //   } else {
  //     handleNotLoggedIn();
  //   }
  // }
  return {
    status: Meteor.status(),
    meteorUser: Meteor.user()
  };
}, Loading)

export default connect(null, { loadUser })(LoadingConnected);