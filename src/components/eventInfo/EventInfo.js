import { Actions } from 'react-native-router-flux';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { updateEventName, changeIcon } from '../../actions';

import Icon from 'react-native-vector-icons/FontAwesome';

import { Colours } from '../styles';
import { Border, Divider } from '../common';
import NavBar from '../navBar/NavBar';

class EventInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasChanged: false,
      eventNameInput: props.eventName,
      iconName: props.iconName
    }
  }

  componentWillUpdate(){
    LayoutAnimation.spring();
  }

  cancel(){
    Actions.pop()
  }

  save(){
    this.props.updateEventName({eventName: this.state.eventNameInput, arrangedBy: this.props.arrangedBy});        
    this.props.changeIcon(this.state.iconName);        
    Actions.pop()
  }

  changeEventName(eventNameInput){
    this.setState({eventNameInput: eventNameInput});
    this.setState({hasChanged: true});
  }

  selectIcon(iconName){
    this.setState({iconName});
  }

  renderInput(){
    return(
      <View>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.eventNameInput}
            placeholder="Event name"
            value={this.state.eventNameInput}
            onChangeText={(eventNameInput) => this.changeEventName(eventNameInput)}        
          />
        </View>
      </View>
    )
  }

  renderIconRow(iconRow){
    const {
      iconRowStyle,
      iconOuterContainer,
      iconInnerContainer,
      iconInnerContainerSelected
    } = styles;

    return (
      <View style={iconRowStyle}>
        <View style={iconOuterContainer}>
          <TouchableOpacity 
            style={iconRow[0] == this.state.iconName ? iconInnerContainerSelected : iconInnerContainer}
            onPress={() => this.selectIcon(iconRow[0])}  
          >
            <Icon name={iconRow[0]} size={28} color={iconRow[0] == this.state.iconName ? '#fff' : Colours.appMain}/>              
          </TouchableOpacity>
        </View>
        <View style={iconOuterContainer}>
          <TouchableOpacity 
            style={iconRow[1] == this.state.iconName ? iconInnerContainerSelected : iconInnerContainer}
            onPress={() => this.selectIcon(iconRow[1])}  
          >
            <Icon name={iconRow[1]} size={28} color={iconRow[1] == this.state.iconName ? '#fff' : Colours.appMain}/>              
          </TouchableOpacity>
        </View>
        <View style={iconOuterContainer}>
          <TouchableOpacity 
            style={iconRow[2] == this.state.iconName ? iconInnerContainerSelected : iconInnerContainer}
            onPress={() => this.selectIcon(iconRow[2])}  
          >
            <Icon name={iconRow[2]} size={28} color={iconRow[2] == this.state.iconName ? '#fff' : Colours.appMain}/>              
          </TouchableOpacity>
        </View>
        <View style={iconOuterContainer}>
          <TouchableOpacity 
            style={iconRow[3] == this.state.iconName ? iconInnerContainerSelected : iconInnerContainer}
            onPress={() => this.selectIcon(iconRow[3])}  
          >
            <Icon name={iconRow[3]} size={28} color={iconRow[3] == this.state.iconName ? '#fff' : Colours.appMain}/>              
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderIcons(){
    const iconRows = [
      ['calendar-o', 'glass', 'beer', 'cutlery'],
      ['birthday-cake', 'coffee', 'heart', 'film'],  
      ['shopping-bag', 'ticket', 'futbol-o', 'bicycle'],  
      ['plane', 'map', 'road', 'question']  
    ];
    let iconRowsToRender = [];
    for (i=0; i<iconRows.length; i++){
      iconRowsToRender.push(this.renderIconRow(iconRows[i]));
    }
    return (
      <View>
        {iconRowsToRender}
      </View>
    )
  }

  renderImages() {
    return (
      <View>
        <Image
          source={require('../../iconImages/Romper.png')}
        />
      </View>
    );
  }

  render(){
    return (
      <View>
        <NavBar
            buttonLeftPress={this.cancel.bind(this)}
            buttonLeftLabel={this.props.eventId ? 'Cancel' : ''}
            buttonLeftFixed={false}
            buttonLeftDisabled={!this.props.eventId}
            buttonRightPress={this.save.bind(this)}
            buttonRightLabel="Done"
            buttonRightFixed={true}
            buttonRightDisabled={(this.props.eventId && !this.state.hasChanged) || (!this.state.eventNameInput)}                       
        />
        <Divider label="Event title" />        
        {this.renderInput()}
        <Divider label="Event icon" />
        {this.renderIcons()}
        <Divider label="Event icon" />
        {this.renderImages()}        
      </View>
    )
  }
}

const styles = {
  eventNameInput: {
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flex: 1
  },

  iconRowStyle: {
    flexDirection: 'row'
  },

  iconOuterContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12
  },

  iconInnerContainer: {
    height: 52,
    width: 52,
    justifyContent: 'center',
    alignItems: 'center'
  },

  iconInnerContainerSelected: {
    height: 52,
    width: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 26,
    backgroundColor: Colours.appMain
  }
}

const mapStateToProps = (state) => {
  const { iconName, arrangedBy } = state.newEventInfo;
  return { iconName, arrangedBy };
};

export default connect(mapStateToProps, { updateEventName, changeIcon })(EventInfo);