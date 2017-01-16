import moment from 'moment';
import React, { Component } from 'react';
import { TouchableOpacity, LayoutAnimation, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ChatInfoItem from '../chatView/ChatInfoItem'
import { Border } from '../common';
import { Colours, Fonts } from '../styles';

class Location extends Component {

  componentWillUpdate(){
    LayoutAnimation.spring();
  }

  render(){
    if (!this.props.locationSelected) {
      return <View/>
    }

    return (
      <ChatInfoItem
        iconName='map-marker'
        buttonArrow
        onPress={() => console.log("location detail")}
      >
        {this.props.location ?
          <Text style={Fonts.chatInfoHeader}>{this.props.location}</Text>
          :
          <Text style={Fonts.chatInfoSubheader}>Location TBC</Text>
        }
      </ChatInfoItem>
      // <View>
      //   <View style={infoContainer}>
      //     <View style={iconContainer}>
      //       <Icon name={this.props.contacts.length === 1 ? 'user' : 'users'} size={16} color={Colours.iconShade}/>
      //     </View>
      //     <View style={inviteInfoContainer}>
      //       {this.renderSelectedInfo(this.props.contacts)}
      //     </View>
      //     <TouchableOpacity style={itemTextButton}>
      //       <Text style={textButtonText}>Change</Text>
      //     </TouchableOpacity>             
      //   </View>
      // </View>
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
    paddingVertical: 4,
    flex: 1
  },

  itemTextButton: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    justifyContent: 'center'
  },

  textButtonText: {
    color: Colours.app
  }
}

const mapStateToProps = (state) => {
  const { location, locationSelected } = state.eventInfo;
  return { location, locationSelected };
};

export default connect(mapStateToProps, { })(Location);
