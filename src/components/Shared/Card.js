import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Type} from '.';
import {useTheme} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');

const Card = ({heading, children}) => {
  const {colors} = useTheme();
  return (
    <View style={{width: '100%'}}>
      <Type
        style={{
          margin: 10,
          marginBottom: 5,
          marginTop: 25,
          fontSize: width / 24,
          color: colors.disabled,
        }}>
        {heading}
      </Type>
      <View
        style={{
          backgroundColor: colors.card,
          padding: 10,
          borderRadius: 10,
        }}>
        {children}
      </View>
    </View>
  );
};

export default Card;
