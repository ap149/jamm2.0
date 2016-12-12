import React, { Component } from 'react';
import { 
  View, 
  Text,
  ActivityIndicator,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { authCheck } from '../../actions';
import Meteor from 'react-native-meteor';
import { Actions } from 'react-native-router-flux';

class AuthCheck extends Component {
  constructor(props) {
    super(props);
    console.log('constructing');
  }

  componentDidMount(){
    console.log('mounted');
    // this.props.authCheck(Meteor.status());
  }


  render() {
    const {
      outerContainer
    } = styles

    return (
      <View style={outerContainer}>
        <ActivityIndicator />
        <Button
          title='test'
          onPress={() => console.log(Meteor.user())}
        />
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

// export default AuthCheck;
export default connect(null, {
  authCheck
})(AuthCheck);