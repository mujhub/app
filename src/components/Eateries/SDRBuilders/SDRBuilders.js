import React from 'react';
import {View} from 'react-native';

import SDRCards from '../SDRBuilders/SDRCards';
// import SDRModals from '../../Home/SDRBuilders/SDRModals';

const SDRBuilder = ({navigation, cards}) => (
  <View>{cards && <SDRCards cards={cards} navigation={navigation} />}</View>
);

export default SDRBuilder;
