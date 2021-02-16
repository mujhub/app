import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {VIBRANTS} from '../../constants/colors';

const {width, height} = Dimensions.get('screen');

const Badge = ({style, viewStyle, color, name}) => {
  return (
    <View
      style={{
        position: 'absolute',
        height: null,
        width: null,
        top: -5,
        right: -5,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon
        name={name}
        size={12}
        style={{
          color,
          marginHorizontal: 5,
          marginVertical: 2,
        }}
      />
    </View>
  );
};

export default Badge;
