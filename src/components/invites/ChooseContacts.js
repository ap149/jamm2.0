import React, { Component } from 'react';
import Contacts from 'react-native-contacts';
import { connect } from 'react-redux';
import { toggleContact, setContactsSelected, resetEventInfo, updateStatus, pushMessage } from '../../actions';
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
    let flattenedContacts = [];
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
            const contactObj = {
              displayName: contact.displayName,
              phoneNumber: contact.phoneNumbers[j].number,
              index: count
            }
            flattenedContacts.push(contactObj);
            count ++;
          }
        }
        this.setState({flattenedContacts});
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});    
        this.setState({allContacts: ds.cloneWithRows(flattenedContacts)});
      }
    });         
  }

  cancel(){   
    this.props.resetEventInfo();
    Actions.pop();    
  }

  done(){
    const msg1 = EventWizHelpers.createAutoMessage(`${this.props.contacts.length} contact${this.props.contacts.length > 1 ? 's' : ''} invited`);
    this.props.pushMessage(msg1); 
    if (!this.props.contactsSelected){
      const msg2 = EventWizHelpers.createBotMessage(EventWizHelpers.msg.NEW_GROUP_NAME);
      this.props.pushMessage(msg2);
      this.props.updateStatus(EventStatus.NEW_GROUP_NAME);
      this.props.setContactsSelected();
    }
    Actions.pop();
    // Actions.pop({refresh: {contacts: this.props.contacts}});   
  }

  toggleContact(contactIndex){
    this.props.toggleContact(contactIndex);
    this.updateList();
  }

  updateList(){
    const contacts = this.props.contacts;
    this.state.flattenedContacts.map(function(obj){
      obj.selected = (contacts.indexOf(obj.index) != -1);
    });
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});    
    this.setState({allContacts: ds.cloneWithRows(this.state.flattenedContacts)});    
  }

  viewAll(){
    this.setState({viewSelected: false});
    Actions.refresh();
  }

  viewSelected(){
    this.setState({viewSelected: true});
    Actions.refresh();    
  }

  renderTick(item){
    const {
      iconContainer
    } = styles;

    return (
      <View style={iconContainer}>
        <Icon name='check' size={16} color={Colours.app}/>
      </View>
    ) 

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
    if (!this.isItemSelected(item)) return <View/>;
    const {
      outerContainer,
      innerContainer,
      innerContainerHighlighted,
      infoContainer,
    } = styles;

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
        
  }

  isItemSelected(item){
    return this.props.contacts.indexOf(item.index) != -1;
  }

  renderAllItems(item){
    const {
      outerContainer,
      innerContainer,
      innerContainerHighlighted,
      infoContainer,
    } = styles;

    const isSelected = this.isItemSelected(item);

    return (
      <View style={outerContainer}>
        <TouchableOpacity 
          style={isSelected ? innerContainerHighlighted : innerContainer}
          onPress={() => this.toggleContact(item.index)}
        >
          <View style={infoContainer}>
            <Text style={Fonts.itemH2}>{item.displayName}</Text>
            <Text style={Fonts.itemNote}>{item.phoneNumber}</Text>
          </View>
          {isSelected ? this.renderTick() : <View/>}
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
            disabled={this.props.contactsSelected}
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
          renderRow={(item) => this.state.viewSelected ? this.renderSelectedItems(item) : this.renderAllItems(item)}
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
  const { contacts, contactsSelected } = state.eventInfo;
  return { contacts, contactsSelected };
};

export default connect(mapStateToProps, { 
  toggleContact,
  setContactsSelected,
  resetEventInfo,
  updateStatus,
  pushMessage
})(ChooseContacts);