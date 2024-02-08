import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Colors from '../themes/colors';
import {
  responsiveFontSize,
  responsiveWidth,
} from '../utils/scalingUtils';

export const Header = props => {
  const {
    onPressBack,
    onPressRight,
    rightIcon,
    leftIcon,
    title,
    isLeft,
    rightButtonStyle,
    isFav,
  } = props;
  return (
    <>
      <View style={[styles.headerContainer, {marginLeft: responsiveWidth(5)}]}>
        <Text style={styles.headerTitleText}>{title}</Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
paddingVertical : 15
  },
  headerTitleText: {
    fontSize: responsiveFontSize(2.2),
    color: Colors.LIGHT_BLACK,
    fontWeight: '700',
  },
  leftIcon: {
    flex: 0.2,
    paddingLeft: responsiveWidth(1),
  },
});
