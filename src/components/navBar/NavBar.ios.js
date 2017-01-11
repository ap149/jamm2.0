import React, { Component } from 'react';
import { StatusBar, View, TouchableOpacity, Button, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavIconButton } from './NavIconButton';
import { NavTextButton } from './NavTextButton';
import { Colours } from '../styles';
import { Border } from '../common';

class NavBar extends Component {
  constructor(){
    super();
    StatusBar.setBarStyle('light-content', true);
  }

  toggleSideMenu() {
    Actions.refresh({key: 'drawer', open: value => !value });
  }  

  _goBack() {
    Actions.pop({refresh: {key: 'drawer', open: false }});    
    // Actions.refresh({key: 'drawer', open: false });
  }

  renderSideMenuButton(){
    const {
      sideMenuButtonOuterContainer,
      sideMenuButton,
    } = styles;

    if (!this.props.sideMenuButton){
      return <View/>
    }
    return (
      <View style={sideMenuButtonOuterContainer}>
        <TouchableOpacity 
          style={sideMenuButton}
          onPress={this.toggleSideMenu.bind(this)} >
          <Icon name="bars" size={21} color={Colours.navBarButton}/>
        </TouchableOpacity>
      </View>
    )
  }
  
  renderButtonLeftLabel(){
    if (!this.props.buttonLeftLabel){
      return <View/>
    }
    const {
      leftButtonContainer
    } = styles;
    
    return (
      <View style={leftButtonContainer}>
        <NavTextButton 
          onPress={this.props.buttonLeftPress}
          disabled={this.props.buttonLeftDisabled}          
          fixed={this.props.buttonLeftFixed}
          buttonRight={false}
        >
          {this.props.buttonLeftLabel}
        </NavTextButton>        
      </View>
    )
  }

  renderButtonRightLabel(){
    if (!this.props.buttonRightLabel){
      return <View/>
    }
    const {
      rightButtonContainer
    } = styles;
    
    return (
      <View style={rightButtonContainer}>
        <NavTextButton 
          onPress={this.props.buttonRightPress}
          disabled={this.props.buttonRightDisabled}
          fixed={this.props.buttonRightFixed}  
          buttonRight={true}   
        >
          {this.props.buttonRightLabel}
        </NavTextButton>        
      </View>
    )
  }

  renderMain(){
    if (this.props.children){
      return (
        <View style={{flex:1}}>{this.props.children}</View>
      )
    }

    if (this.props.title){
      const {titleContainer, title} = styles;
      return (
        <View style={titleContainer}>
          <Text style={title}>{this.props.title}</Text>
        </View>
      )
    }

    return (
      <View style={{flex: 1}}/>
    )
  }

  render(){
    const {
      outerContainer,
    
      sideMenuButton,
      rightButtonContainer
    } = styles;

    return (
      <View style={outerContainer}>
        {this.renderSideMenuButton()}
        {this.renderButtonLeftLabel()}
        {this.renderMain()}
        {this.renderButtonRightLabel()}
      </View>
    )
  }
}

const styles = {
  outerContainer: {
    paddingTop: 21,
    minHeight: 69,
    backgroundColor: Colours.navBarBack,
    flexDirection: 'row',
    // justifyContent: 'space-between'    
  },


  navBarEmptyContainer: {
    width: 10,
  },

  sideMenuButtonOuterContainer: {
    width: 80,
    // paddingLeft: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  sideMenuButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  leftButtonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },

  rightButtonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontSize: 16,
    color: '#fff',
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
