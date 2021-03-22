import React from 'react';
import {View, Text} from 'react-native';
import {Type} from '../../Shared';

const SDRModals = ({modals}) => {
  return (
    <View>
      <Type>{JSON.stringify(modals)}</Type>
    </View>
  );
};

export default SDRModals;
