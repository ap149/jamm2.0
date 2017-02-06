import * as _ from 'lodash';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { updateNewGroupName } from '../../actions';
import { EventStatus } from '../eventWiz/EventStatus';
import { View, TouchableOpacity, Text, TextInput, ListView, LayoutAnimation } from 'react-native';
import NavBar from '../navBar/NavBar';
import { Colours, Fonts } from '../styles';
import { Border, Divider } from '../common'
import Icon from 'react-native-vector-icons/FontAwesome';

class GroupSettings extends Component {
  constructor(props){
    super(props);
    this.state = ({
      popNum: props.popNum || 1,
      newGroupMode: true,
      groupNameInput: props.groupNameInput || null,      
      changesMade: false,
    });
  }

  cancel(){
    Actions.pop();
  }

  save(){
    this.props.updateNewGroupName(this.state.groupNameInput);
    if (this.state.popNum > 1){
      Actions.pop({popNum: this.state.popNum});
    } else {
      Actions.pop();
    }
  }

  changeGroupName(groupNameInput){
    this.setState({groupNameInput: groupNameInput});
    this.setState({changesMade: true});
  }

  renderInput(){
    return(
      <View>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.groupNameInput}
            placeholder="Event name"
            value={this.state.groupNameInput}
            onChangeText={(groupNameInput) => this.changeGroupName(groupNameInput)}        
          />
        </View>
        <Border />        
      </View>
    )
  }

  renderMemberRow(item){
    return (
      <Text>{item.displayName}</Text>
    )
  }

  renderMembers(){
    let
      contacts = [this.props.userObj].concat(this.props.contactObjs);
      rows = [];
    contacts = _.sortBy(contacts, 'displayName');
    for (i=0; i<contacts.length; i++){
      rows.push(this.renderMemberRow(contacts[i]))
    }
    return (
      <View>
        {rows}
      </View>
    )
  }

  render(){
    return (
      <View>
        <NavBar
            buttonLeftPress={this.cancel.bind(this)}
            buttonLeftLabel={(this.state.newGroupMode) ? 'Cancel' : ''}
            buttonLeftFixed={true}
            buttonLeftDisabled={false}
            title="Group settings"
            buttonRightPress={this.save.bind(this)}
            buttonRightLabel="Save"
            buttonRightFixed={true}
            buttonRightDisabled={!this.state.changesMade}                       
        />
        <Divider label="Group name" />        
        {this.renderInput()}
        <Divider label="Members" />
        {this.renderMembers()}        
      </View>
            
    )
  }

}

const styles = {
  groupNameInput: {
    fontSize: 18,
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1
  },

  rowOuterContainer: {

  },

  rowInnerContainer: {
    flexDirection: 'row'
  }
}

const mapStateToProps = (state) => {
  const { newGroupName, contactObjs } = state.newEventInfo;
  const { userObj } = state.user;
  return { newGroupName, contactObjs, userObj };
};

export default connect(mapStateToProps, { updateNewGroupName })(GroupSettings);