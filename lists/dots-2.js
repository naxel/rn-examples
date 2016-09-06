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

class SampleApp extends Component {

    constructor(props) {
        super(props);
        this.listLength = 10;
        this.selected = false;
        this._animatedValues = [];
    }

    componentWillMount() {
        for (let i = 0; i < this.listLength; i++) {
            this._animatedValues.push(new Animated.Value(0));
        }
        this.currentValues = new Array(this.listLength).fill(0);
    }

    _animateSelect(num) {
        if (this.selected !== false && this.selected !== num) {
            //reset old
            this.currentValues[this.selected] = 0;
            Animated.timing(this._animatedValues[this.selected], {
                toValue: 0,
                duration: 300
            }).start();
        }

        this.currentValues[num] = +!this.currentValues[num] * 100;
        Animated.timing(this._animatedValues[num], {
            toValue: this.currentValues[num],
            duration: 300
        }).start();

        this.selected = (this.currentValues[num]) ? num : false;
    }

    render() {
        let rows = [];
        let that = this;
        let renderRow = function (num) {
            let interpolatedCircleSize = that._animatedValues[num].interpolate({
                inputRange: [0, 100],
                outputRange: [20, 40]
            });
            let interpolatedCircleBorderWidth = that._animatedValues[num].interpolate({
                inputRange: [0, 100],
                outputRange: [7, 2]
            });
            let interpolatedLabelColor = that._animatedValues[num].interpolate({
                inputRange: [0, 100],
                outputRange: ["#333", '#FFF']
            });
            let interpolatedLabelFontSize = that._animatedValues[num].interpolate({
                inputRange: [0, 100],
                outputRange: [16, 20]
            });
            return (
                <TouchableWithoutFeedback key={'li_' + num} onPress={() => {that._animateSelect(num)}}>
                    <View style={styles.navItem}>
                        <View style={styles.navItemCircleWrapper}>
                            <Animated.View style={[styles.navItemCircle, {
                              borderWidth: interpolatedCircleBorderWidth,
                                height: interpolatedCircleSize, 
                                width: interpolatedCircleSize
                                }]}/>
                        </View>
                        <Animated.Text style={{
                            fontWeight: 'bold',
                            color: interpolatedLabelColor,
                            fontSize: interpolatedLabelFontSize
                            }}>
                            Label {num + 1}
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

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#78b395'
    },
    navItemCircleWrapper: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    navItemCircle: {
        backgroundColor: "rgba(0,0,0,0)",
        borderColor: '#609279',
        borderRadius: 50
    },
    navItem: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('SampleApp', () => SampleApp);
