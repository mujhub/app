import React from 'react';
import {Dimensions} from 'react-native';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const SceneBorder = (props) => {
  const {colors} = useTheme();
  return (
    <View style={{minHeight: height}}>
      <View style={{marginHorizontal: 15, marginVertical: 10}}>
        {props.children}
      </View>
    </View>
  );
};

export default SceneBorder;
