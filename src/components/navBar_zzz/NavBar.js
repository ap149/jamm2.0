import React, { Component } from 'react';
import { View, TouchableOpacity, Button, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavIconButton } from './NavIconButton';
import { NavTextButton } from './NavTextButton';
import { Colours } from '../styles';
import { Border } from '../common';

class NavBar extends Component {

  _toggleSideMenu() {
    Actions.refresh({key: 'drawer', open: value => !value });
  }  

  _goBack() {
    Actions.pop({refresh: {key: 'drawer', open: false }});    
    // Actions.refresh({key: 'drawer', open: false });
  }

  _cancel() {
    Actions.pop(); 
  }

  _newEvent(){
    console.log("new event");
    Actions.eventWiz();
  }

  _renderSideMenuButton(){
    if (this.props.sideMenuButton){
      return (
        <NavIconButton onPress={this._toggleSideMenu.bind(this)}>bars</NavIconButton>
      )
    }
  }
  
  _renderBackButton(){
    if (this.props.backButton){
      return (
        <NavIconButton onPress={this._goBack.bind(this)}>chevron-left</NavIconButton>
      );
    }
  }
  
  _renderCancelButton(){
    if (this.props.cancelButton){
      return (
        <NavTextButton onPress={this._cancel.bind(this)}>Cancel</NavTextButton>
      );
    }
  }

  _renderNewButton(){
    if (this.props.newButton){
      return (
        <NavIconButton onPress={this._newEvent.bind(this)}>plus</NavIconButton>
      );
    }
  }

  render(){
    const {
      outerContainer,
      innerContainer,
      leftButtonContainer,
      rightButtonContainer
    } = styles;

    return (
      <View style={outerContainer}>
        <View style={innerContainer}>
          <View style={leftButtonContainer}>
            {this._renderSideMenuButton()}
            {this._renderBackButton()}       
            {this._renderCancelButton()} 
          </View>
          <View style={rightButtonContainer}>
            {this._renderNewButton()}
          </View>
        </View>
        <Border />
      </View>
    )
  }
}

const styles = {
  outerContainer: {
    paddingTop: 21,
    minHeight: 63,
    // backgroundColor: Colours.app,
  },

  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  leftButtonContainer: {
    // justifyContent: 'flex-start',
    height: 40,
    minWidth: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red'
  },

  rightButtonContainer: {
    // flex: 1,
    // justifyContent: 'flex-end',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconButton: {
    color: Colours.app,
    fontSize: 24
  },

  navTextButton: {
    color: Colours.app,

    
  }
}

export default NavBar;
