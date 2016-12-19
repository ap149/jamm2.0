import React, { Component } from 'react';
import { 
  View, 
  ListView,
  Text, 
  LayoutAnimation 
} from 'react-native';
import { connect } from 'react-redux';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import moment from 'moment';
import ChatBubble from './ChatBubble';
import { ChatAutoMsg } from './ChatAutoMsg';
import { Colours } from '../styles';

// const offline = true;

class ChatView extends Component {
  constructor(props) {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };    
  }

  getTimeStamp(date){
    return moment(date).calendar(null, {
      sameDay: 'h:mm A',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday] h:mm A',
      lastWeek: '[Last] dddd h:mm A',
      sameElse: 'DD/MM/YYYY h:mm A'      
    })
  }

  renderChatBubble(item){
    return (
      <ChatBubble 
        fromUser={item.fromObj.userId === this.props.userId}
        timestamp={this.getTimeStamp(item.createdAt)}
      >
        {item.body}
      </ChatBubble>
    );
  }

  renderChatAutoMsg(item){
    return (
      <ChatAutoMsg
        body={item.body}
      />
    )
  }

  handleRender(item) {
    switch (item.fromType){
      case 'auto':
        return this.renderChatAutoMsg(item);
      default:
        return this.renderChatBubble(item);
    }
  }

  getDataSource(){
    // let data = this.props.messages || this.state.dataSource;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(this.props.messages);    
  }

  render() {
    const { 
      chatContainer
    } = styles;

    return (
      <ListView
        enableEmptySections={true}
        renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}          
        dataSource={this.props.chatData}
        renderRow={(item) => this.handleRender(item)}
      />
    )
  }
}

const styles = {
  chatContainer: {
    // flex: 1,
    justifyContent: 'flex-end',
    borderColor: 'green',
    borderWidth: 3
  }
}

const mapStateToProps = (state) => {
  const { userId } = state.user;
  const { messages } = state.eventInfo;
  return { userId, messages };
};

export default connect(mapStateToProps, {})(ChatView);