import * as _ from 'lodash';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { chooseCountry } from '../../actions';

import * as Helpers from '../common/Helpers';
import * as AuthWizHelpers from './AuthWizHelpers';
import * as ChatHelpers from '../chatView/ChatHelpers';

import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text, 
  TouchableOpacity,
} from 'react-native';
import NavBar from '../navBar/NavBar'

const countries = [
  {
    key: 'uk',
    country: 'United Kingdom',
    countryShort: 'UK',
    code: '+44(0)',
  },
  {
    key: 'us',
    country: 'United States',
    countryShort: 'US',
    code: '+1',
  }
]

class ChooseCountry extends Component {
  constructor(){
    super();
    this.state = {
      inputText: ''
    }
  }

  selectCountry(item){
    console.log(item);
    Actions.pop();
    return false;
  }

  renderItem(item){
    const {
      itemContainer,
      countryLabel,
      countryCode
    } = styles;
    const self = this;
    return (
      <TouchableOpacity
        onPress={(item) => this.selectCountry}
        style={itemContainer}
      >
        <Text style={countryLabel}>{item.country}</Text>
        <Text style={countryCode}>{item.code}</Text>
      </TouchableOpacity>
    )
  }

  render(){
    return (
      <View>
        <NavBar
          title="Choose country"
        />
        <ScrollView>
          {countries.map(this.renderItem)}
        </ScrollView>
      </View>
    );
  }
};

const styles = {
  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12
  },

  countryLabel: {
    flex: 1
  },

  countryCode: {

  }
}

export default connect(null, { chooseCountry })(ChooseCountry);