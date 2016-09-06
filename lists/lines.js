import React, {Component,} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    TouchableWithoutFeedback
} from 'react-native';

class App extends Component {

    constructor(props) {
        super(props);
        this.listLength = 5;
        this.selected = false;
        this._animatedValues = [];
    }

    componentWillMount() {
        for (let i = 0; i < this.listLength; i++) {
            let value = new Animated.Value(0);
            this._animatedValues.push(value);
        }
        this.currentValues = new Array(this.listLength).fill(0);
    }

    _animateSelect(num) {
        if (this.selected !== false && this.selected !== num) {
            //reset old
            this.currentValues[this.selected] = 0;
            Animated.timing(this._animatedValues[this.selected], {
                toValue: 0,
                duration: 200
            }).start();
        }

        this.currentValues[num] = +!this.currentValues[num] * 100;
        Animated.timing(this._animatedValues[num], {
            toValue: this.currentValues[num],
            duration: 200
        }).start();

        this.selected = (this.currentValues[num]) ? num : false;
    }

    render() {
        let rows = [];
        let that = this;
        let renderRow = function (num) {
            let interpolatedLineHeight = that._animatedValues[num].interpolate({
                inputRange: [0, 100],
                outputRange: [50, 0]
            });
            let interpolatedLabelColor = that._animatedValues[num].interpolate({
                inputRange: [0, 100],
                outputRange: ["#4fc369", '#419253']
            });

            return (
                <TouchableWithoutFeedback key={'li_' + num} onPress={() => {that._animateSelect(num)}}>
                    <View style={styles.navItem}>
                        <View style={styles.navItemWrapper}>
                            <Animated.View style={{
                                    height: 50, 
                                    width: 5,
                                    backgroundColor: '#419253'
                                                 }}>
                                <Animated.View style={[{
                                    height: interpolatedLineHeight, 
                                    width: 5,
                                    backgroundColor: '#4fc369'
                                    }]}/>
                            </Animated.View>
                        </View>
                        <Animated.Text style={{
                            fontWeight: 'bold',
                            color: interpolatedLabelColor,
                            fontSize: 30,
                            transform: [{rotate: '90deg'}]
                            }}>
                            0{num + 1}
                        </Animated.Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        };

        for (let i = 0; i < this.listLength; i++) {
            rows.push(
                (function (num) {
                    return renderRow(num)
                })(i)
            );
        }
        return (
            <ScrollView style={styles.container}>
                <View style={{marginTop: 50}}>
                    {rows}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#62ea80'
    },
    navItemWrapper: {
        width: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    navItem: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('App', () => App);
