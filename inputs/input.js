'use strict';

import React, { Component, } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  TextInput
} from 'react-native';

class MyInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: null
    }
    this.animatedValue = new Animated.Value(0);
  }
  componentWillMount() {
    this.inputValue = '';
  }
  onChangeText(text) {
    this.inputValue = text;
    this.setState({ isValid: this.inputValue.length > 0 })
  }
  selectField() {
    Animated.timing(this.animatedValue, {
      toValue: 100,
      duration: 200
    }).start();
  }
  deselectField() {
    if (this.inputValue.length> 0) {
      return;
    }
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 200
    }).start();
  }
  render() {
    let that = this;
    let interpolatedLabelPosition = that.animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [35, 0]
    });
    let interpolatedLabelSize = that.animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [26, 14]
    });
    let borderColor = (this.state.isValid === null)? '#999': ((this.state.isValid === true)? '#88ff00': '#F00');
    let color = (this.state.isValid === true)? '#88ff00': '#999';
    return (
      <View style={[styles.myInputStyle, { borderColor: borderColor}]}>
        <Animated.Text
          style={{fontSize: interpolatedLabelSize, top: interpolatedLabelPosition, color: color}}>
          {this.props.label}
        </Animated.Text>
        <TextInput
          style={styles.textInput}
          onFocus={()=> {this.selectField()}}
          onBlur={()=> {this.deselectField()}}
          onChangeText={(text) => {this.onChangeText(text)}}
        />
      </View>
    )
  }
}

class SampleApp extends Component {
  render() {

    return (
      <ScrollView style={styles.container}>
        <View style={styles.list}>

          <MyInput label='First Name' />

          <MyInput label='Last Name' />

          <MyInput label='Company' />
        </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  list: {
    marginTop: 100,
    marginLeft: 5
  },
  myInputStyle: {
    borderBottomWidth: 1,
    width: 300,
    height: 70
  },
  textInput: {
    height: 40,
    fontSize: 26,
    color: '#eee'
  }
});

AppRegistry.registerComponent('SampleApp', () => SampleApp);
