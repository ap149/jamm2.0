import React, { Component } from 'react';
import Contacts from 'react-native-contacts';
import { connect } from 'react-redux';
import { toggleContact, setContactsSelected, resetContactsSelected, updateNewGroupName, updateStatus, pushMessage } from '../../actions';
import { Actions } from 'react-native-router-flux';
import * as Helpers from '../common/Helpers';
import * as EventWizHelpers from '../eventWiz/EventWizHelpers';
import { EventStatus } from '../eventWiz/EventStatus';
import { View, TouchableOpacity, Text, TextInput, ListView, LayoutAnimation } from 'react-native';
// import { NavBarContainer } from '../navBar/NavBarContainer';
// import { NavTextButton } from '../navBar/NavTextButton';
import NavBar from '../navBar/NavBar';
import ChatInfoItem from '../chatView/ChatInfoItem'
import { Colours, Fonts } from '../styles';
import { Border } from '../common'
import Icon from 'react-native-vector-icons/FontAwesome';

class ContactPicker extends Component {
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
    this.props.resetContactsSelected();
    Actions.pop();    
  }

  done(){
    if (this.props.contactsSelected){
      console.log("contacts selected");
      Actions.pop();
      return;
    }
    Actions.pop();
    // const strJoin = this.props.contacts.length > 1 ? 'contacts' : 'contact';
    // const str = `${this.props.contacts.length} {strJoin} selected`;
    this.props.updateStatus(false);          
    Helpers.delayShort()
    .then(() => {
      if (this.props.contacts.length > 1){
        const msg2 = EventWizHelpers.createBotMessage(EventWizHelpers.msg.NEW_GROUP_NAME);
        this.props.pushMessage(msg2);
        this.props.updateStatus(EventStatus.NEW_GROUP_NAME);
      } else {
        const msg2 = EventWizHelpers.createBotMessage(EventWizHelpers.msg.PROMPT_DATES);
        this.props.pushMessage(msg2);
        this.props.updateStatus(EventStatus.PROMPT_DATES);
      }
      this.props.setContactsSelected();
    })
  }

  toggleContact(contactIndex){
    this.props.toggleContact(contactIndex, this.state.flattenedContacts[contactIndex]);
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

  saveAsGroup(){
    console.log('save as group');
  }

  renderFilter(){
    if (this.props.contacts.length == 0) return <View/>

    return (
      <TouchableOpacity
        style={styles.textButtonContainer}
        onPress={this.state.viewSelected ? this.viewAll.bind(this) : this.viewSelected.bind(this)}
      >
        <Text style={styles.textButton}>{this.state.viewSelected ? "View all" : `View selected (${this.props.contacts.length})`}</Text>
      </TouchableOpacity>
    )
  }

  renderSaveAsGroup(){
    if (this.props.contactsSelected && !this.props.newGroupName && (this.props.contacts.length > 1)){
      return (
        <ChatInfoItem
          iconName='upload'
          buttonArrow
          onPress={this.saveAsGroup.bind(this)}
        >
          <Text style={Fonts.chatInfoSubheader}>Save as permanent group?</Text>          
        </ChatInfoItem>        
      )
    }
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
        <NavBar
            buttonLeftPress={this.cancel.bind(this)}
            buttonLeftLabel={(this.props.contactsSelected) ? ' ' : 'Cancel'}
            buttonLeftFixed={true}
            buttonLeftDisabled={this.props.contactsSelected}
            buttonRightPress={this.done.bind(this)}
            buttonRightLabel="Done"
            buttonRightFixed={true}
            buttonRightDisabled={this.props.contacts.length == 0}                       
        >
          {this.renderFilter()}
        </NavBar>
        {this.renderSaveAsGroup()}
        <ListView
          // enableEmptySectionHeaders          
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
  
  textButtonContainer: {
    alignItems: 'center',
    paddingTop: 6
  },

  textButton: {
    color: Colours.navBarButton,
    fontSize: 18,
    paddingHorizontal: 8,
    paddingVertical: 7,
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
    backgroundColor: '#f1f1f1' 
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
  const { contacts, contactsSelected, newGroupName } = state.eventInfo;
  return { contacts, contactsSelected, newGroupName };
};

export default connect(mapStateToProps, { 
  toggleContact,
  setContactsSelected,
  resetContactsSelected,
  updateNewGroupName,
  updateStatus,
  pushMessage
})(ContactPicker);