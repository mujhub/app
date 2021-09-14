import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Type} from '.';
import {useTheme} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');

const Card = ({heading, children}) => {
  const {colors} = useTheme();
  return (
    <View style={{width: '100%'}}>
      {heading && (
        <Type
          style={{
            marginBottom: 5,
            fontSize: width / 28,
            color: colors.disabled,
          }}>
          {heading}
        </Type>
      )}
      <View
        style={{
          backgroundColor: colors.card,
          padding: 10,
          borderRadius: 10,
          marginTop: heading ? 0 : 25,
        }}>
        {children}
      </View>
    </View>
  );
};

export default Card;
