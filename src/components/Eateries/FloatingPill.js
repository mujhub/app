import React from 'react';
import {View, Text} from 'react-native';

import {FloatingButton, Type} from '../Shared';

import {OUTLETS} from '../../constants/strings';
import {PRIMARY} from '../../constants/colors';

const FloatingPill = () => (
  <FloatingButton icon="scan" iconColor="white" color={PRIMARY}>
    <Type style={{marginHorizontal: 8, color: 'white'}}>
      {OUTLETS.SCANNER_TEXT}
    </Type>
  </FloatingButton>
);

export default FloatingPill;
