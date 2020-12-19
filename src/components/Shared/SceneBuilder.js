import React from 'react';
import {Dimensions} from 'react-native';
import {View, Text} from 'react-native';

import {COLORS} from '../../constants';

const {width, height} = Dimensions.get('window');

const SceneBorder = (props) => {
  return (
    <View style={{backgroundColor: COLORS.GRAY.T2, minHeight: height}}>
      <View style={{marginHorizontal: 15, marginVertical: 10}}>
        {props.children}
      </View>
    </View>
  );
};

export default SceneBorder;
