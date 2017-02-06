import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEventName, changeIcon } from '../../actions';
import { Actions } from 'react-native-router-flux';
import iconPath from '../icons/IconPath';
import { EventStatus } from '../eventWiz/EventStatus';
import { View, TouchableOpacity, Text, TextInput, Image, ListView, ScrollView, LayoutAnimation } from 'react-native';
import NavBar from '../navBar/NavBar';
import { Colours, Fonts } from '../styles';
import { Border, Divider } from '../common'

class IconPicker extends Component {
  constructor(props){
    super(props);

    this.state = {
      newEventMode: props.newEventMode,
      eventNameInput: props.eventName,
      iconName: false,
      changesMade: false,
    };      
  }

  cancel(){   
    Actions.pop();    
  }

  next(){
    this.props.updateEventName({eventName: this.state.eventNameInput, arrangedBy: this.props.displayName});
    this.props.changeIcon(this.state.iconName);
    Actions.eventWizChat(); 
  }

  changeEventName(eventNameInput){
    this.setState({eventNameInput: eventNameInput});
    this.setState({changesMade: true});
  }  

  selectIcon(str){
    this.setState({changesMade: true});
    this.setState({eventNameInput: str});
    this.setState({iconName: str});
  }

  renderInput(){
    return(
      <View>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.eventNameInput}
            placeholder='Tap icon or enter title...'
            value={this.state.eventNameInput}
            onChangeText={(eventNameInput) => this.changeEventName(eventNameInput)}
            disabled={!this.state.iconName && !this.state.eventNameInput}        
          />
        </View>
        <Border />        
      </View>
    )
  }

  renderIcon(iconName){
    const {
      iconOuterContainer,
      iconInnerContainer,
      iconInnerContainerSelected
    } = styles;
    console.log(iconName);
    return (
      <View style={iconOuterContainer}>
        <TouchableOpacity 
          style={iconName == this.state.iconName ? iconInnerContainerSelected : iconInnerContainer}
          onPress={() => this.selectIcon(iconName)}  
        >
          <Image source={iconPath(iconName)} />
        </TouchableOpacity>
      </View>
    )
  }

  renderIconSet(iconSet, index){
    let renderedIcons = []
    for (j=0; j<iconSet.icons.length; j++){
      renderedIcons.push(this.renderIcon(iconSet.icons[j]));
    }
    return (
      <View  key={index * (j+1)}>
        <Text>{iconSet.category}</Text>
        <View style={styles.iconSetContainer}>
          {renderedIcons}
        </View>
        <Border />
      </View>
    )
  }

  renderIcons(){
    const iconSets = [
      {
        category: 'Food and drink',
        icons: [
          'Food-and-drink', 'Pizza', 'Beer', 'Sushi'
        ]
      },
    ];
    let renderedIconSets = [];
    for (i=0; i<iconSets.length; i++){
      renderedIconSets.push(this.renderIconSet(iconSets[i], i+1));
    }
    return (
      <ScrollView contentContainerStyle={styles.list}>
        {renderedIconSets}
      </ScrollView>      
    )
  }

  render(){
    const {
      midContainer,
    } = styles;

    return (
      <View>
        <NavBar
            buttonLeftPress={this.cancel.bind(this)}
            buttonLeftLabel={'Cancel'}
            buttonLeftFixed={true}
            buttonLeftDisabled={false}
            buttonRightPress={this.next.bind(this)}
            buttonRightLabel="Next"
            buttonRightFixed={true}
            buttonRightDisabled={!this.state.changesMade && !this.state.iconName && !this.state.eventNameInput}                       
        />
        <Divider label="Event name" />        
        {this.renderInput()}
        <Divider label="Event icon" />
        {this.renderIcons()} 
      </View>  
    )
  }  
}

const styles = {
  eventNameInput: {
    fontSize: 18,
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1
  },

  list: {
    // justifyContent: 'center',
    // flexDirection: 'row',
    // flexWrap: 'wrap'
  },

  iconSetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'    
  },

  iconRowStyle: {
    flexDirection: 'row'
  },

  iconOuterContainer: {
    // flex: 1,
    height: 75,
    width: 75,    
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 12,
    // margin: 15
  },

  iconInnerContainer: {
    height: 64,
    width: 64,
    justifyContent: 'center',
    alignItems: 'center'
  },

  iconInnerContainerSelected: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    width: 64,    
    borderRadius: 32,
    backgroundColor: Colours.greyBack
  }  
}

const mapStateToProps = (state) => {
  const { displayName } = state.user;
  const { newGroupName, iconName } = state.newEventInfo;
  return { displayName, newGroupName, iconName };
};

export default connect(mapStateToProps, { 
  updateEventName, changeIcon
})(IconPicker);