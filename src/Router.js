import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Loading from './components/auth/Loading';
import AuthCheck from './components/auth/AuthCheck';
import RequestCode from './components/auth/RequestCode';
import VerifyCode from './components/auth/VerifyCode';
import Profile from './components/auth/Profile';
import SideMenu from './components/sideMenu/SideMenu';
import EventList from './components/eventList/EventList';
import CalendarList from './components/calendarList/CalendarList';
import EventWiz from './components/eventWiz/EventWiz';
import CalendarPicker from './components/calendarPicker/CalendarPicker';
import ChooseContacts from './components/invites/ChooseContacts';
import { Colours, Fonts } from './components/styles';

const RouterComponent = () => {

  return (
    <Router 
      barButtonIconStyle={styles.barButtonIconStyle}
      // sceneStyle={{ paddingTop: 63 }} 
      navigationBarStyle={styles.navBar}
      titleStyle={styles.navBarTitle} 
      barButtonTextStyle={styles.barButtonTextStyle} 
    >    
      <Scene key="loading">
        <Scene key='loadingscreen' component={Loading} title="Loading..."/>
      </Scene>
      <Scene key="auth">
        <Scene key="requestCode" component={RequestCode} title="Verify Phone" /> 
        <Scene key="verifyCode" component={VerifyCode} title="Enter Code"/> 
        <Scene key="profile" component={Profile} title="Last Step"/>
        <Scene key="authCheck" component={AuthCheck} title="" />                  
      </Scene>           
      <Scene key="drawer" component={SideMenu} open={false}>
          <Scene key='eventList' component={EventList} hideNavBar={true}/>      
      </Scene>           
      <Scene key='calendarList' component={CalendarList} hideNavBar={true}/>
      <Scene key='eventWiz'>
        <Scene key="calendarPicker" direction="vertical" hideNavBar={true} component={CalendarPicker}  panHandlers={null}/>      
        <Scene key="eventWizChat" direction="vertical" hideNavBar={true} component={EventWiz}  panHandlers={null}/>
        <Scene key="chooseContacts" direction="vertical" hideNavBar={true} component={ChooseContacts}  panHandlers={null}/>        
      </Scene>
    </Router>
  );
};

const styles = {
  navBar: {
      backgroundColor: Colours.app,
  },
  navBarTitle:{
      color: '#FFFFFF',
      fontWeight: Fonts.bold
  },
  barButtonTextStyle:{
      color: '#FFFFFF'
  },
  barButtonIconStyle:{
      tintColor: 'rgb(255,255,255)'
  },  
}

export default RouterComponent;
