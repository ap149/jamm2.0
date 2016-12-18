import React, { Component } from 'react';
import Contacts from 'react-native-contacts';
import { connect } from 'react-redux';
import { toggleContact, resetEventInfo, updateStatus, pushMessage } from '../../actions';
import { Actions } from 'react-native-router-flux';
import * as EventWizHelpers from '../eventWiz/EventWizHelpers';
import { EventStatus } from '../eventWiz/EventStatus';
import { View, TouchableOpacity, Text, ListView, LayoutAnimation } from 'react-native';
import { NavBarContainer } from '../navBar/NavBarContainer';
import { NavTextButton } from '../navBar/NavTextButton';
import { Colours, Fonts } from '../styles';
import { Border } from '../common'
import Icon from 'react-native-vector-icons/FontAwesome';

class ChooseContacts extends Component {
  constructor(){
    super();

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      searchFilter: '',
      viewSelected: false,
      allContacts: ds.cloneWithRows([]),
      flattenedContacts: []
    };      
  }

  componentWillUpdate(){
    LayoutAnimation.spring();
  }

  componentWillMount(){
    let phoneContacts = [];
    let flattedContacts = [];
    Contacts.getAll((err, contacts) => {
      if(err && err.type === 'permissionDenied'){
        // x.x
      } else {
        phoneContacts = contacts;
        phoneContacts.map(function(obj){
          obj.displayName = obj.givenName + " " + obj.familyName;
        });
        phoneContacts.sort(function(a, b){
          var nameA = a.displayName.toUpperCase(); // ignore upper and lowercase
          var nameB = b.displayName.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;          
        });
        let count = 0
        for (i=0; i < phoneContacts.length; i++){
          const contact = phoneContacts[i];
          for (j=0; j < contact.phoneNumbers.length; j++){
            const selected = (this.props.contacts.indexOf(count) != -1);
            const contactObj = {
              displayName: contact.displayName,
              phoneNumber: contact.phoneNumbers[j].number,
              index: count,
              selected: selected
            }
            flattedContacts.push(contactObj);
            count ++;
          }
        }
        this.setState({flattedContacts});
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});    
        this.setState({allContacts: ds.cloneWithRows(flattedContacts)});
      }
    });         
  }

  cancel(){   
    this.props.resetEventInfo();
    Actions.pop();    
  }

  done(){
    const msg = EventWizHelpers.createBotMessage(EventWizHelpers.msg.NEW_GROUP_NAME);
    this.props.pushMessage(msg);
    this.props.updateStatus(EventStatus.NEW_GROUP_NAME);
    Actions.pop({refresh: {contacts: this.props.contacts}});   
  }

  toggleContact(contactIndex){
    this.props.toggleContact(contactIndex);
    this.updateList();
  }

  updateList(){
    const contacts = this.props.contacts;
    this.state.flattedContacts.map(function(obj){
      obj.selected = (contacts.indexOf(obj.index) != -1);
    });
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});    
    this.setState({allContacts: ds.cloneWithRows(this.state.flattedContacts)});    
  }

  viewAll(){
    this.setState({viewSelected: false});
  }

  viewSelected(){
    this.setState({viewSelected: true});
  }

  renderTick(item){
    const {
      iconContainer
    } = styles;

    if (item.selected){
      return (
        <View style={iconContainer}>
          <Icon name='check' size={16} color={Colours.app}/>
        </View>
      ) 
    } else {
      return <View/>
    }
  }

  renderDelete(item){
    const {
      iconContainer
    } = styles;

    return (
      <TouchableOpacity style={iconContainer} onPress={() => this.toggleContact(item.index)}>
        <Icon name='times' size={16} color={Colours.app}/>
      </TouchableOpacity>
    )    
  }

  renderSelectedItems(item){
    const {
      outerContainer,
      innerContainer,
      innerContainerHighlighted,
      infoContainer,
    } = styles;

    if (item.selected){
      return (
        <View style={outerContainer}>
          <View 
            style={innerContainer}
          >
            <View style={infoContainer}>
              <Text style={Fonts.itemH2}>{item.displayName}</Text>
              <Text style={Fonts.itemNote}>{item.phoneNumber}</Text>
            </View>
            {this.renderDelete(item)}
          </View>
          <Border/>
        </View>
      )
    } else {
      return <View/>
    }         
  }

  renderAllItems(item){
    const {
      outerContainer,
      innerContainer,
      innerContainerHighlighted,
      infoContainer,
    } = styles;

    return (
      <View style={outerContainer}>
        <TouchableOpacity 
          style={item.selected ? innerContainerHighlighted : innerContainer}
          onPress={() => this.toggleContact(item.index)}
        >
          <View style={infoContainer}>
            <Text style={Fonts.itemH2}>{item.displayName}</Text>
            <Text style={Fonts.itemNote}>{item.phoneNumber}</Text>
          </View>
          {this.renderTick(item)}
        </TouchableOpacity>
        <Border/>
      </View>
    )
  }

  renderItem(item){
    if (this.state.viewSelected){
      return this.renderSelectedItems(item);
    } else{
      return this.renderAllItems(item);
    }
  }

  renderNavButton(){
    if (this.state.viewSelected){
      return (
        <NavTextButton
          onPress={this.viewAll.bind(this)}
          label="View all"
          disabled={false}
        />  
      )      
    } else {
      return (
        <NavTextButton
          onPress={this.viewSelected.bind(this)}
          label={`View selected (${this.props.contacts.length})`}
        />
      ) 
    }
  }

  render(){
    const {
      midContainer,
    } = styles;

    return (
      <View>
        <NavBarContainer>
          <NavTextButton
            onPress={this.cancel.bind(this)}
            label="Cancel"
            disabled={false}
          />                  
          <View style={midContainer}>
            {this.renderNavButton()}
          </View>
          <NavTextButton
            onPress={this.done.bind(this)}
            label="Done"
            disabled={this.props.contacts.length === 0}
          />                            
        </NavBarContainer>
        <ListView
          enableEmptySectionHeaders          
          dataSource={this.state.allContacts}
          renderRow={(item) => this.renderItem(item)}
        />
      </View>  
    )
  }  
}

const styles = {
  midContainer: {
    flex: 1,
    alignItems: 'center'
    // flexDirection: 'row',
    // paddingLeft: 7
  },

  outerContainer: {

  },

  innerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row' 
  },

  innerContainerHighlighted: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    backgroundColor: '#f7f7f7' 
  },

  infoContainer: {
    flex: 1
  },

  iconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  } 
}

const mapStateToProps = (state) => {
  const { contacts } = state.eventInfo;
  return { contacts };
};

export default connect(mapStateToProps, { toggleContact, resetEventInfo, updateStatus, pushMessage })(ChooseContacts);