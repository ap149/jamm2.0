import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Drawer from 'react-native-drawer';
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import SideMenuContent from './SideMenuContent';

class SideMenu extends Component {
    render(){
        const state = this.props.navigationState;
        const children = state.children;
        return (
            <Drawer
                ref={c => this.drawer = c}
                open={state.open}
                // onOpen={()=>Actions.refresh({key:state.key, open: true})}
                // onClose={()=>Actions.refresh({key:state.key, open: false})}                
                type="displace"
                content={<SideMenuContent />}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                negotiatePan={true}
                tweenHandler={(ratio) => ({
                 main: { opacity:Math.max(0.54,1-ratio) }
            })}>
              <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />                
            </Drawer>
        );
    }
}

export default SideMenu;