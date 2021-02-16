import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from 'react-native-paper';

const ItemSeparator = () => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        width: '90%',
        height: 0.5,
        backgroundColor: colors.disabled + '55',
        alignSelf: 'center',
      }}></View>
  );
};

export default ItemSeparator;
