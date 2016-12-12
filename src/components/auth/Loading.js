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

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  _handleConnect() {
    console.log("load user called");
    if (this.props.status.connected){
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
      outerContainer
    } = styles

    return (
      <View style={outerContainer}>
     
        <ActivityIndicator />
      </View>
    )
  }
}

const styles = {
  outerContainer: {
    flex: 1,
    justifyContent: 'center'
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