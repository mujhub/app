import React from 'react';
import {Dimensions} from 'react-native';

import {Card, Type} from '../Shared';
import {DMS} from '../../constants/strings';

const {width, height} = Dimensions.get('screen');

const InfoCard = (props) => {
  return (
    <Card heading={DMS.GREET}>
      <Type
        style={{
          fontWeight: 'bold',
          marginHorizontal: 10,
          marginVertical: 5,
          fontSize: width / 18,
        }}>
        {props.name}
      </Type>
      <Type
        style={{
          marginHorizontal: 10,
          fontSize: width / 22,
        }}>
        {props.id}
      </Type>
      <Type
        style={{
          margin: 10,
          marginTop: 0,
          fontSize: width / 28,
        }}>
        {props.program}
      </Type>
    </Card>
  );
};

export default InfoCard;
