import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TouchableOpacity
} from 'react-native';

export default class example extends Component {

  constructor(props) {
    super(props);
    this.animValue1 = new Animated.Value(0);
    this.animValue2 = new Animated.Value(0);
    this.animValue3 = new Animated.Value(0);
    this.animValue4 = new Animated.Value(0);
    this.animValue5 = new Animated.Value(0);
  }

  onPress() {
    this.animValue1.setValue(0);
    this.animValue2.setValue(0);
    this.animValue3.setValue(0);
    this.animValue4.setValue(0);
    this.animValue5.setValue(0);

    Animated.timing(
      this.animValue1,
      {
        toValue: 250,
        duration: 2000,
        easing: Easing.ease
      },
    ).start();
    Animated.timing(
      this.animValue2,
      {
        toValue: 250,
        duration: 2000,
        easing: Easing.elastic(2)
      },
    ).start();
    Animated.timing(
      this.animValue3,
      {
        toValue: 250,
        duration: 2000,
        easing: Easing.inOut(Easing.quad)
      },
    ).start();
    Animated.timing(
      this.animValue4,
      {
        toValue: 250,
        duration: 2000,
        easing: Easing.bounce
      },
    ).start();
    Animated.timing(
      this.animValue5,
      {
        toValue: 250,
        duration: 2000,
        easing: Easing.linear
      },
    ).start();
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.header}>Animated::Easing</Text>

        <Animated.View
          style={[styles.circle, {left: this.animValue1}]}
        >
          <Text style={styles.label}>ease</Text>
        </Animated.View>

        <Animated.View
          style={[styles.circle, {left: this.animValue2}]}
        >
          <Text style={styles.label}>elastic</Text>
        </Animated.View>

        <Animated.View
          style={[styles.circle, {left: this.animValue3}]}
        >
          <Text style={styles.label}>inOut</Text>
        </Animated.View>

        <Animated.View
          style={[styles.circle, {left: this.animValue4}]}
        >
          <Text style={styles.label}>bounce</Text>
        </Animated.View>

        <Animated.View
          style={[styles.circle, {left: this.animValue5}]}
        >
          <Text style={styles.label}>linear</Text>
        </Animated.View>

        <TouchableOpacity onPress={() => {
          this.onPress()
        }}>
          <Text style={styles.label}>Press me</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    margin: 10
  },
  header: {
    marginVertical: 10,
    textAlign: 'center'
  },
  circle: {
    height: 60,
    width: 60,
    backgroundColor: '#399',
    borderRadius: 30,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: 10,
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('example', () => example);
