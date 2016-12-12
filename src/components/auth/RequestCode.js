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
import Meteor from 'react-native-meteor';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { Note, Border } from '../../components/common';
import { Colours } from '../../components/styles';

class RequestCode extends Component {
  constructor() {
    super();

    this.state = {
      sendingCode: false,
      country: {
        name: 'United Kingdom',
        code: '44'
      },
      phoneNumber: null
    }

  }

  onSelectCountry() {
    Keyboard.dismiss();
  }

  sendCode() {
    console.log('sending code');
    this.setState({
      sendingCode: true
    });
    Meteor.call('sendVerificationCode', this.state.phoneNumber, this.state.country.code, (err, res) => {
      this.setState({sendingCode: false});
      if (err) {
        console.log(err);
      } else {
        console.log("success");
        console.log(res);
        Actions.verifyCode({
          type: 'reset',
          phoneNumber: this.state.phoneNumber,
          countryCode: this.state.country.code
        });        
      }
    })
  }

  renderButton() {
    const { button } = styles;

    if (this.state.sendingCode) {
      return (
        <ActivityIndicator
          animating={this.state.sendCode}
        />
      )
    } else {
      return (
        <Button 
          disabled={!this.state.phoneNumber}
          style={button}
          color={Colours.app}
          title='Send Code'
          onPress={this.sendCode.bind(this)}
        />
      )
    }
  }

  render() {
    const {
      border,
      outerContainer, 
      noteContainer,
      mainContainer,
      countryContainer,
      countryLabel,
      countrySelected,
      countryName,
      dropdownArrow,
      phoneContainer,
      countryCode,
      phoneInput,
      buttonContainer
    } = styles

    return (
      <View style={outerContainer}>
        <View style={noteContainer}>
          <Note>We need to verify your phone. Please select your country, enter your number and tap 'Send Code'.</Note>
        </View>
        <Border />
        <View style={mainContainer}>
          <View style={countryContainer}>
            <View style={countryLabel}>
              <Text>Select country</Text>
            </View>
            <TouchableOpacity
              style={countrySelected}
              onPress={() => console.log('select country')}
            >
              <Text style={countryName}>{this.state.country.name}</Text>
              <Icon
                style={dropdownArrow} 
                name="caret-down"
              />                
            </TouchableOpacity>      
          </View>
          <View style={phoneContainer}>
            <Text style={countryCode}>+{this.state.country.code}</Text>
            <TextInput 
              style={phoneInput}
              placeholder='your phone number'
              keyboardType='numeric'
              autoFocus={true}
              onChangeText={phoneNumber => this.setState({phoneNumber})}
              value={this.state.phoneNumber}
            />
          </View>        
        </View>
        <Border />
        <View style={buttonContainer}>
          {this.renderButton()}
        </View>
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

  mainContainer: {

  },

  countryContainer: {
    flexDirection: 'row',
    // borderColor: 'red',
    // borderWidth: 1,
    paddingHorizontal: 32,
    paddingVertical: 8
  },

  countryLabel: {
    flex: 3,
    paddingVertical: 8
  },

  countrySelected: {
    flex: 4,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingVertical: 8,
  },

  countryName: {
    flex: 4,
    justifyContent: 'flex-end',
    textAlign: 'right',
    paddingRight: 5    
  },

  dropdownArrow: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16      
  },

  phoneContainer: {
    paddingBottom: 8, 
    paddingHorizontal: 32,   
    flexDirection: 'row',
    alignItems: 'center'
  },

  countryCode: {
    // paddingVertical: 8,
    // height: 40,
    flex: 1,
    fontSize: 18,
    // borderColor: 'red',
    // borderWidth: 1,
    // alignItems: 'flex-end',
    // textAlign: 'center'      
  },

  phoneInput: {
    // paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 18,
    flex: 5,
    height: 40,
    // borderColor: 'red',
    // borderWidth: 1,    
  },

  buttonContainer: {
    paddingTop: 24
  },

  button: {

  }

}

export default RequestCode;