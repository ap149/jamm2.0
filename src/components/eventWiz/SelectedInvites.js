import React, { Component } from 'react';
import { LayoutAnimation, View, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Border } from '../common';
import { Colours, Fonts } from '../styles';

class SelectedInvites extends Component {
  constructor(props){
    super();
  }

  componentWillUpdate(){
    LayoutAnimation.spring();
  }

  renderSelectedInfo(contacts){
    if (contacts.length == 1 || (!this.props.newGroupName)){
      return (
        <Text style={Fonts.itemH3}>{contacts.length} contacts invited</Text>
      )
    }
    if ((contacts.length > 1) && this.props.newGroupName){
      return (
        <View>
          <Text style={Fonts.itemH3}>{this.props.newGroupName}</Text>
          <Text style={Fonts.itemNote}>You plus {contacts.length} others</Text>
        </View>
      )      
    }
  }

  render(){
    const {
      infoContainer,
      iconContainer,
      inviteInfoContainer
    } = styles;
    return (
      <View>
        <View style={infoContainer}>
          <View style={iconContainer}>
            <Icon name={this.props.contacts.length === 1 ? 'user' : 'users'} size={16} color={Colours.iconShade}/>
          </View>
          <View style={inviteInfoContainer}>
            {this.renderSelectedInfo(this.props.contacts)}
          </View>
        </View>
        <Border/>        
      </View>
    )
  }
}

const styles = {
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: Colours.navBarBack
  },

  iconContainer: {
    width: 40,
    minHeight: 40,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  inviteInfoContainer: {
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4
  }
}

const mapStateToProps = (state) => {
  const { newGroupName } = state.eventInfo;
  return { newGroupName };
};

export default connect(mapStateToProps, { })(SelectedInvites);
