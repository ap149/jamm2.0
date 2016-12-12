import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Button,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { updateName } from '../../actions';
import { Actions } from 'react-native-router-flux';
import Meteor from 'react-native-meteor';
import store from 'react-native-simple-store';
import { Note, Border } from '../../components/common'
import { Colours } from '../../components/styles';

const offline = true;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileName: null
    }
  }

  updateDisplayName(){
    this.props.updateName(this.props.userId, this.state.profileName);
  }

  render() {
    const { 
      outerContainer,
      noteContainer,
      inputContainer,
      inputLabel,
      nameInput,
      buttonContainer
    } = styles;

    return (
      <View style={outerContainer}>
        <View style={noteContainer}>
          <Note>Let us know how you like to be known. You can change your name anytime.</Note>
        </View>
        <View style={inputContainer}>
          <Text style={inputLabel}>Name:</Text>
          <TextInput 
            style={nameInput}
            placeholder='Jane Smith'
            onChangeText={(profileName) => this.setState({profileName})}
            value={this.state.profileName}            
          />
        </View>
        <View style={buttonContainer}>
          <Button
            onPress={this.updateDisplayName.bind(this)}
            title='Done'
            disabled={!this.state.profileName}
          />
        </View>
        <Text>{this.props.userPhonenumber}</Text>
        <Text>{this.props.userId}</Text>
      </View>
    )
  }
}

const styles = {
  outerContainer: {
    flex: 1
  },

  noteContainer: {
    paddingVertical: 20
  },

  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1    
  },

  inputLabel: {
    flex: 2,
    fontSize: 18,
    borderColor: 'red',
    borderWidth: 1
  },

  nameInput: {
    flex: 5,
    height: 40,
    fontSize: 18,
    borderColor: 'red',
    borderWidth: 1    
  },

  buttonContainer: {

  }
}

const mapStateToProps = (state) => {
  const { userId, displayName, userPhonenumber } = state.user;

  return { userId, userPhonenumber };
};

export default connect(mapStateToProps, { updateName })(Profile);