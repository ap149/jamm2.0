import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Keyboard,
  Button,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { createUser } from '../../actions';
import { Actions } from 'react-native-router-flux';
import Meteor, { Accounts } from 'react-native-meteor';
import store from 'react-native-simple-store';
import { Note, Border } from '../../components/common'
import { Colours } from '../../components/styles';


const offline = false;

class VerifyCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      codeString: null,
      code: [],
      checkingCode: false
    }
  }

  resetState() {
    this.setState({
      codeString: '',
      code: []
    })
  }

  offlineHandle() {
    this.setState({checkingCode: true});
    setTimeout(function() {
      Actions.profile({type: 'reset'});
    }, 1500);
  }

  enterDigit(str) {
    if (this.state.code.length == 3) {
      const codeArray = str.split('');
      this.setState({code: codeArray});
      const code = str.substring(0,4);
      this.setState({checkingCode: true});
      const self = this;
      if (offline){
        this.offlineHandle();
        return;
      }
      Meteor.call('verifyCode', this.props.phoneNumber, this.props.countryCode, code,(err, res) => {
        this.setState({checkingCode: false});
        if (err){
          console.log(err);
          this.resetState();
        } else {
          console.log(res);
          const obj = {
            username: this.props.countryCode + this.props.phoneNumber,
            password: res
          };
          console.log(obj);
          store.save('jammUser', obj)
          .then(() => store.get('jammUser'))
          .then(userObj => {
            const pwd = userObj.password;
            Meteor.Accounts.createUser(userObj, (err) => {
              if (err){
                console.log(err);
              } else {
                Meteor.loginWithPassword(userObj.username, pwd, (err) => {
                  if (!err){
                    this.props.createUser(Meteor.user());
                    Actions.profile({type: 'reset'});
                  }
                })
              }
            })
          })
        }
      });
    } else {
      const codeArray = str.split('');
      this.setState({code: codeArray});
    }
  }

  renderLoading(){
    const {
      loading
    } = styles

    if (this.state.checkingCode) {
      return (
        <ActivityIndicator
          style={loading}
          animating={true}
        />        
      );
    }    
  }

  renderInput() {
    const {
      codeElement,
      codeInputContainer      
    } = styles

    return (
      <View style={codeInputContainer}>
        <Text style={codeElement}>
          {this.state.code[0]?
            this.state.code[0] :
            '-'  
          }
        </Text>
        <Text style={codeElement}>
          {this.state.code[1]?
            this.state.code[1] :
            '-'  
          }
        </Text>
        <Text style={codeElement}>
          {this.state.code[2]?
            this.state.code[2] :
            '-'  
          }
        </Text>
        <Text style={codeElement}>
          {this.state.code[3]?
            this.state.code[3] :
            '-'  
          }
        </Text>
      </View>
    );
  }

  render() {
    const { 
      outerContainer,
      noteContainer,
      dummyInput
    } = styles;

    return (
      <View style={outerContainer}>
        <View style={noteContainer}>
          <Note>You will receive an SMS with a 4-digit code. Please enter that below.</Note>
        </View>
        <Border />
        <TextInput
          style={dummyInput}
          keyboardType='numeric'
          autoFocus={true}
          onChangeText={(str) => this.enterDigit(str)}
          value={this.state.codeString}
        />
        {this.renderInput()}
        {this.renderLoading()}
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

  dummyInput: {
    opacity: 0
  },

  codeInputContainer: {
    flexDirection: 'row',
    // paddingHorizontal: 72,
    justifyContent: 'center',
    paddingTop: 42
  },

  codeElement: {
    // flex: 1,
    width: 32,
    // borderColor: 'red',
    // borderWidth: 1,
    textAlign: 'center',
    fontSize: 20
  },

  loading: {
    paddingTop: 42
  }
}

export default connect(null, { createUser })(VerifyCode);