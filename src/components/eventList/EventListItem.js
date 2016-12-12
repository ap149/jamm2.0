import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemIconButton from './ItemIconButton';
import RowButtonIcon from './RowButtonIcon';
import { ListThumbnail, Border, ActionButton } from '../common';
import { Colours, Fonts } from '../styles';

class EventListItem extends Component {
  constructor(){
    super();

    this.state = {
      showInfo: false
    };
  }

  renderInfo(){
    const {
      cardRow,
      cardInfoContainer,
      cardRowButton,
      rowInfoContainer,
    } = styles;

    if (this.state.showInfo){
      return (
        <View style={cardInfoContainer}>
          <View style={cardRow}>
            <RowButtonIcon>calendar-o</RowButtonIcon>
            <Text>dates</Text>
          </View>
          <View style={cardRow}>
            <RowButtonIcon>map-marker</RowButtonIcon>
            <Text>dates</Text>
          </View>
          <View style={cardRow}>
            <RowButtonIcon>user</RowButtonIcon>
            <View style={rowInfoContainer}>
              <Text style={Fonts.itemSubheader}>Group name</Text>
              <Text style={Fonts.itemNote}>5 people</Text>
            </View>
          </View>
          <View style={cardRow}>
            <RowButtonIcon>comments</RowButtonIcon>
            <TouchableOpacity 
              style={cardRowButton}
              onPress={() => console.log('pressed')}>
              <Text>Messages</Text>
            </TouchableOpacity>
          </View>          
        </View>  
      )
    }
  }

  render(){
    const {
      outerContainer,
      cardContainer,
      cardHeaderContainer,
      thumbnail,
      cardHeader,
      eventTitleContainer,
      eventOrganiserContainer,
      eventStatusContainer,
      cardFooterContainer,
      cardFooterMainButton
    } = styles;

    return (
      <View style={outerContainer}>
        <View style={cardContainer}>
          <View style={cardHeaderContainer}>
            <ListThumbnail />
            <View style={cardHeader}>
              <View style={eventTitleContainer}>
                <Text
                  numberOfLines={2} 
                  style={Fonts.itemTitle}>MTS Reunion drinks  
                </Text>
              </View>
              <Text style={[eventOrganiserContainer, Fonts.itemSubheader]}>arranged by J R Hartley</Text>          
              <Text style={[eventStatusContainer, Fonts.itemNote]}>Status: confirmed</Text>          
            </View>
          </View>
          {this.renderInfo()}
          <TouchableOpacity 
            style={cardFooterContainer}
            onPress={() => this.setState({showInfo: !this.state.showInfo})}
          >
            <Icon name={this.state.showInfo ? "chevron-up" : "chevron-down"} size={16} color="#444" />
          </TouchableOpacity>
        </View>
        <Border/>
      </View>
    );

  }
};



const styles = {
  outerContainer: {
    marginTop: 12,
    marginHorizontal: 8,
  },

  cardContainer: {
    // flexDirection: 'row',
    // alignItems: 'center'
  },

  cardHeaderContainer: {
    flexDirection: 'row',
    backgroundColor: '#eee'
    // alignItems: 'center'
  },

  thumbnail: {
    width: 50,
    height: 50,
    borderColor: 'green',
    borderWidth: 1
  },

  cardHeader: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 8,
    paddingRight: 8,
    // justifyContent: 'space-between',
    // borderColor: 'green',
    // borderWidth: 1
  },

  eventTitleContainer: {
    flex: 2,
    // paddingBottom: 3,
    // borderColor: 'green',
    // borderWidth: 1    
  },
  
  
  eventOrganiserContainer: {
    paddingTop: 3,
    flex: 1,
    // alignItems: 'center',
    // borderColor: 'green',
    // borderWidth: 1    
  },

  eventStatusContainer: {
    flex: 1,
    paddingTop: 3,
    // borderColor: 'green',
    // borderWidth: 1    
  },

  itemButtonContainer: {
    flex: 2,
    flexDirection: 'row',

  },

  cardInfoContainer: {

  },

  cardRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  cardRowButton: {
    flex: 1,
    paddingVertical: 10,
    // borderColor: 'green',
    // borderWidth: 1    
  },

  rowInfoContainer: {
    justifyContent: 'space-between'
  },

  cardFooterContainer: {
    // flexDirection: 'row'
    alignItems: 'center',
    paddingVertical: 8
  },

  cardFooterMainButton: {
    flex: 1,
    alignContent: 'center',
    paddingVertical: 12
  }

}

export default EventListItem;