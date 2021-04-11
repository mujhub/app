import React from 'react';
import {View, Text} from 'react-native';
import analytics from '@react-native-firebase/analytics';

import {FloatingButton, Type} from '../Shared';

import {OUTLETS} from '../../constants/strings';
import {PRIMARY} from '../../constants/colors';

const FloatingPill = ({navigation}) => (
  <FloatingButton
    icon="scan"
    iconColor="white"
    color={PRIMARY}
    onPress={async () => {
      await analytics().logEvent('scan_qr');
      navigation.navigate('QrReaderScreen');
    }}>
    <Type style={{marginHorizontal: 8, color: 'white'}}>
      {OUTLETS.SCANNER_TEXT}
    </Type>
  </FloatingButton>
);

export default FloatingPill;
