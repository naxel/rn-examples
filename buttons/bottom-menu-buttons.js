import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class buttons extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    React Native UI component based of screenshot
                </Text>

                <View style={styles.leftButtonWrapper}>
                    <TouchableOpacity onPress={() => Alert.alert(
            'Button #1 pressed!',
          )}>
                        <View elevation={5} style={style.buttonOuter}>
                            <View style={styles.buttonInner}>
                                <Icon style={styles.buttonIcon}
                                      size={35}
                                      name="bars"
                                      color="rgb(33,123,134)"
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.rightButtonWrapper}>
                    <TouchableOpacity onPress={() => Alert.alert(
           'Button #2 pressed!',
          )}>
                        <View elevation={5} style={style.buttonOuter}>
                            <View style={styles.buttonInner}>
                                <Icon style={styles.buttonIcon}
                                      size={35}
                                      name="gear"
                                      color="rgb(33,123,134)"/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    leftButtonWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    rightButtonWrapper: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    buttonIcon: {
        borderRadius: 100,
        textAlign: 'center'
    },
    buttonOuter: {
        borderWidth: 1, borderColor: 'rgba(0,0,0, 0.1)',
        backgroundColor: "#FFF",
        borderRadius: 100,
        padding: 5, margin: 5
    },
    buttonInner: {
        borderWidth: 2, borderColor: 'rgb(33,123,134)',
        width: 50, height: 50,
        backgroundColor: "rgb(239,247,238)",
        borderRadius: 1000,
        padding: 5
    }
});

AppRegistry.registerComponent('buttons', () => buttons);
