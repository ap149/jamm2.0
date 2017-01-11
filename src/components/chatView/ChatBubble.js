import React, { Component } from 'react';
import { View, Text, LayoutAnimation, Animated } from 'react-native';
import { Colours } from '../styles';

const BORDER_RADIUS = 13;
let typingInterval;

class ChatBubble extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0
    }
  }

  componentWillMount(){
    if (this.props.typing){
      typingInterval = setInterval(()=> {
        if (this.state.counter == 2){
          this.setState({counter: 0})
        } else {
          this.setState({counter: this.state.counter + 1})
        }
      }, 225)
    }
  }

  componentWillUpdate(){
    if (this.props.typing){
      LayoutAnimation.spring();
    }
  }

  componentWillUnmount(){
    if (this.props.typing){
      clearInterval(typingInterval);
    }
  }

  renderTyping(){
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={this.state.counter == 0 ? styles.typingDotActive : styles.typingDot} />
        <View style={this.state.counter == 1 ? styles.typingDotActive : styles.typingDot} />
        <View style={this.state.counter == 2 ? styles.typingDotActive : styles.typingDot} />
      </View>
    )
  }

  _renderLeftBubble(typing = false){
    const { 
      leftOuterContainer,
      leftInnerContainer,
      leftBubbleContainer,
      leftArrowContainer,
      leftArrowInner,
      leftInnerSpace,
      leftTimestamp
    } = styles;

    return (
      <View style={leftOuterContainer}>
        <View style={leftInnerContainer}>
          <View style={leftArrowContainer}>
            <View style={leftArrowInner} />
          </View>      
          <View style={leftBubbleContainer}>
            {typing ? this.renderTyping() : <Text>{this.props.children}</Text>}
          </View>
        </View>
        <View style={leftInnerSpace}/>
      </View>      
    )
  }

  _renderRightBubble(){
    const { 
      rightOuterContainer,
      rightInnerContainer,
      rightBubbleContainer,
      rightArrowContainer,
      rightArrowInner,
      rightInnerSpace,
      rightBubbleText,
      rightTimestamp
    } = styles;

    return (
      <View style={rightOuterContainer}>
        <View style={rightInnerSpace}/>      
        <View style={rightInnerContainer}>
          <View style={rightBubbleContainer}>
            <Text style={rightBubbleText}>{this.props.children}</Text>            
          </View>
          <View style={rightArrowContainer}>
            <View style={rightArrowInner} />
          </View>                
        </View>
      </View>      
    )
  }

  _handleRender(){
    if (this.props.typing){
      return this._renderLeftBubble(true);
    }    
    if (this.props.fromUser){
      return this._renderRightBubble();
    } else {
      return this._renderLeftBubble();
    }
  }

  render(){

    const {fromUser} = this.props;

    const { 
      container,
      bubbleContainer,
      userBubble,
      otherBubble,
      bubbleContent
    } = styles;

    return (
      <View style={[container]}>
        {this._handleRender()}
      </View>
    );
  }
};

const styles = {
  container: {
    // borderColor: '#ccc',
    // borderWidth: 0.5,
    flexDirection: 'row'
  },

  leftOuterContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  leftInnerSpace: {
    flex: 1
  },

  leftInnerContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 8,  
  },

  leftBubbleContainer: {
    // flex: 1,
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 9,
    borderRadius: 13,
    borderBottomLeftRadius: 0     
  },

  leftArrowContainer: {
    width: 28,
    height: 28,
    backgroundColor: '#eee'
  },

  leftArrowInner: {
    width: 28,
    height: 28,
    backgroundColor: '#fff',
    borderBottomRightRadius: 14
  },

  leftTimestamp: {
    fontSize: 10,
    textAlign: 'right',
    color: '#666',
    paddingVertical: 5
  },

  rightOuterContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  rightInnerSpace: {
    flex: 1
  },

  rightInnerContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 8,  
  },

  rightBubbleContainer: {
    // flex: 1,
    backgroundColor: Colours.appMain,
    paddingVertical: 9,
    paddingHorizontal: 9,
    borderRadius: 13,
    borderBottomRightRadius: 0     
  },

  rightArrowContainer: {
    width: 28,
    height: 28,
    backgroundColor: Colours.appMain
  },

  rightArrowInner: {
    width: 28,
    height: 28,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 14
  },

  rightBubbleText: {
    color: '#fff'
  },

  rightTimestamp: {
    fontSize: 10,
    textAlign: 'right',
    color: '#f4f4f4',
    paddingVertical: 5
  },

  typingDot: {
    backgroundColor: '#bbb',
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
    marginVertical: 4
  },

  typingDotActive: {
    backgroundColor: '#bbb',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    marginVertical: 4
  }

};

export default ChatBubble;