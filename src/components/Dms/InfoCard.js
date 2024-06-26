import React from 'react';
import {View, Dimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {Card, Type} from '../Shared';
import {DMS} from '../../constants/strings';

const {width, height} = Dimensions.get('screen');

const InfoCard = (props) => {
  const {colors} = useTheme();
  return (
    <Card heading={DMS.GREET}>
      <Type
        style={{
          fontWeight: 'bold',
          marginHorizontal: 10,
          marginTop: 16,
          fontSize: width / 20,
        }}>
        {props.name}
      </Type>
      <Type
        style={{
          marginHorizontal: 10,
          marginVertical: 5,
          fontSize: width / 24,
        }}>
        {props.id}
      </Type>
      {props.program ? (
        <Type
          style={{
            marginHorizontal: 10,
            fontSize: width / 28,
          }}>
          {props.program}
        </Type>
      ) : null}
      <Type
        style={{
          margin: 10,
          marginBottom: 16,
          fontSize: width / 30,
          // lineHeight:
          color: colors.disabled,
        }}>
        {DMS.SECURE_MESSAGE}
      </Type>
    </Card>
  );
};

export default InfoCard;
