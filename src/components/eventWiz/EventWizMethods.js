import Meteor from 'react-native-meteor';

const DELAY = 1000;

export default EventWizMethods = {
  updateEventName: function(eventName){
    Meteor.call('updateEventName', eventName);
  },

  promptEventImage: function(eventName, delayed){
    if (delayed){
      setTimeout(function() {
        Meteor.call('promptEventImage', eventName);        
      }, DELAY);
    } else {
      Meteor.call('promptEventImage', eventName);      
    }
  },

  promptChooseInvites: function(delayed){
    if (delayed){
      setTimeout(function() {
        Meteor.call('promptChooseInvites');        
      }, DELAY);
    } else {
      Meteor.call('promptChooseInvites');      
    }
  },

  promptNewGroupName: function(delayed){
    if (delayed){
      setTimeout(function() {
        Meteor.call('promptNewGroupName');        
      }, DELAY);
    } else {
      Meteor.call('promptNewGroupName');      
    }
  },
}