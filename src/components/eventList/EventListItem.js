import Meteor from 'react-native-meteor';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { setEventId } from '../../actions';
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemIconButton from './ItemIconButton';
import RowButtonIcon from './RowButtonIcon';
import AvatarIcon from '../avatar/AvatarIcon';
import { ListThumbnail, Border, ActionButton } from '../common';
import { Colours, Fonts } from '../styles';

class EventListItem extends Component {
  constructor(props){
    super(props);
  }

  onPress(){
    console.log(this.props.eventItem._id);
    this.props.setEventId(this.props.eventItem._id);
    Actions.eventDetail({eventId: this.props.eventItem._id});
  }

  renderImg(url){
    return (
      <View>
        <Text>{url}</Text>
      </View>
    )
  }

  renderIcon(iconName){
    return (
      <AvatarIcon
        large
        iconName={iconName}
      />
    )
  }

  renderWith(){
    const {
      users,
      groupName
    } = this.props.eventItem;

    let str;
    if (groupName){
      str = `with ${groupName}`; 
    }
    if (users.length > 2){
      str = `you and ${users.length - 1} others`;
    }
    if (users.length == 2){
      const bool = (users[0].userId == Meteor.userId());
      str = bool ? `with ${users[1].displayName}` : `with ${users[0].displayName}`;
    }
    return (
      <Text style={Fonts.itemH3}>{str}</Text>
    )
  }

  renderNote(){
    const {
      dateOptions
    } = this.props.eventItem    

    let str;
    if (dateOptions.length == 1){
      let 
        dateObj = dateOptions[0],
        startTime = '',
        endTime = '';
      if (dateObj.startTime) {
        startTime = `, ${moment(dateObj.startTime).format("h:mma")}`;
      }
      if (dateObj.endTime) {
        endTime = ` - ${moment(dateObj.endTime).format("h:mma")}`;
      }
      str = `${moment(dateObj.date).format("ddd D MMM")}${startTime}${endTime}`
    } else {
      str = `${dateOptions.length} dates suggested`;
    }

    return (
      <Text style={Fonts.itemNote}>{str}</Text>
    )
  }

  render(){
    const {
      updated,
      imgUrl,
      iconName,
      eventName
    } = this.props.eventItem

    const {
      itemContainer,
      avatarContainer,
      infoContainer,
      infoItemContainer,
      itemHeaderContainer,
      itemEventNameContainer,
      itemTimestampContainer,
      itemHeader,
      itemTimestamp,
      itemSubheader,
      itemNote,
      itemPointer
    } = styles;

    const timeFormatObj = {
      sameDay: 'h:mma',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: 'dddd',
      sameElse: 'DD/MM'      
    }
    // console.log(this.props.eventItem);
    return (
      <View>      
        <TouchableOpacity style={itemContainer} onPress={this.onPress.bind(this)}>
          
          <View style={avatarContainer}>
            {imgUrl ?
              this.renderImg(imgUrl)
              :
              this.renderIcon(iconName)
            }
          </View>

          <View style={infoContainer}>
            <View style={infoItemContainer}>
                <View style={itemEventNameContainer}>
                  <Text style={Fonts.itemH2}>
                    {eventName}
                  </Text>
                </View>
                <View style={itemTimestampContainer}>
                  <Text style={itemTimestamp}>{moment(updated).calendar(null, timeFormatObj)}</Text>
                </View>
            </View>
            <View style={infoItemContainer}>
              {this.renderWith()}
            </View>
            <View style={infoItemContainer}>
              {this.renderNote()}
            </View>
          </View>

          <View style={itemPointer}>
            <Icon name='angle-right' size={24} color={Colours.lightText}/>          
          </View>            

        </TouchableOpacity>
      </View>
    );

  }
};

const styles = {
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: Colours.borderColor,
    flex: 1,
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 6,
  },

  avatarContainer: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    justifyContent: 'center'
  },

  infoContainer: {
    flex: 1,
    // paddingLeft: 8,
    paddingTop: 2
  },

  infoItemContainer: {
    flexDirection: 'row',
  },

  itemHeaderContainer: {
    flexDirection: 'row',
    // alignContent: 'center',
  },

  itemEventNameContainer: {
    flex: 1
  },

  itemTimestampContainer: {
    // flex: 1
    justifyContent: 'center'
  },

  itemHeader: {
    fontSize: 16,
    lineHeight: 20,
    // fontWeight: 'bold'
  },

  itemTimestamp: {
    fontSize: 12,
    color: '#666'
  },

  itemSubheader: {
    fontSize: 16,
    lineHeight: 20
  },

  itemNote: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666'
    // color: Colours.appMain
  },

  itemPointer: {
    paddingRight: 8,
    paddingLeft: 12,
    justifyContent: 'center'
  }
}

export default connect(null, { setEventId })(EventListItem);