/**
 * Created by naxel on 06.09.2016.
 */
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
            let interpolatedSelectSizeAnimation = that._animatedValues[num].interpolate({
                inputRange: [0, 100],
                outputRange: [30, 45]
            });
            let interpolatedSelectBorderWidthAnimation = that._animatedValues[num].interpolate({
                inputRange: [99, 100],
                outputRange: [0, 1]
            });
            return (
                <TouchableWithoutFeedback key={'li_' + num} onPress={() => {that._animateSelect(num)}}>
                    <View style={styles.navItem}>
                        <View style={styles.navItemWrapper}>
                            <Animated.View style={[styles.navItemSquare, {
                height: interpolatedSelectSizeAnimation,
                    width: interpolatedSelectSizeAnimation,
                    borderWidth:interpolatedSelectBorderWidthAnimation
            }]}/>
                        </View>
                        <Text>Label {num + 1}</Text>

                    </View>
                </TouchableWithoutFeedback>
            )
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
        flex: 1
    },
    navItemWrapper: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    navItemSquare: {
        backgroundColor: "#6fbdfd",
        marginRight: 5,
        borderColor: '#4b6f95'
    },
    navItem: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('SampleApp', () => SampleApp);