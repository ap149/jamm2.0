import React, { Component } from 'react';
import { View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { Colours } from '../../components/styles';

class SideMenuContent extends Component {

  _goHome(){
    Actions.refresh({key: 'drawer', open: value => false });
  }

  _goCal(){
    // Actions.refresh({key: 'drawer', open: false });
    // Actions.pop();
    Actions.calendarList();
  }

  render(){
    const {
      outerContainer
    } = styles;

    return (
      <View style={outerContainer}>
        <Button
          title="home"
          onPress={this._goHome.bind(this)}
        />
        <Button
          title="cal"
          onPress={this._goCal.bind(this)}
        />
      </View>
    )
  }
}

const styles = {
  outerContainer: {
    paddingTop: 15,
    height: 63,
    backgroundColor: Colours.app
  }
}

export default SideMenuContent;
