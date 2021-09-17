import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from 'react-native-paper';

const ItemSeparator = ({
  widthPercentage = '90%',
  opacityHex = '55',
  viewStyle,
}) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        width: widthPercentage,
        height: 0.5,
        backgroundColor: colors.disabled + opacityHex,
        alignSelf: 'center',
        ...viewStyle,
      }}></View>
  );
};

export default ItemSeparator;
