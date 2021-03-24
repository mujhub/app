import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Type} from '.';

const {width, height} = Dimensions.get('screen');

const ListFooter = ({msg}) => {
  return (
    <View style={{paddingBottom: height / 2}}>
      <Type>{msg}</Type>
    </View>
  );
};

export default ListFooter;
