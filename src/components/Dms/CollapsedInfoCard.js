import React from 'react';
import {View, Dimensions} from 'react-native';
import {useTheme} from 'react-native-paper';

import {Type} from '../Shared';

const {width, height} = Dimensions.get('screen');

const CollapsedInfoCard = (props) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 10,

        backgroundColor: colors.background,
      }}>
      <Type
        style={{
          fontWeight: 'bold',
          color: colors.disabled,
          // marginHorizontal: 10,
          fontSize: width / 28,
          // textDecorationLine: 'underline',
        }}>
        {props.name}
      </Type>
      <Type
        style={{
          fontWeight: 'bold',
          color: colors.disabled,
          // marginHorizontal: 10,
          fontSize: width / 28,
          // textDecorationLine: 'underline',
        }}>
        {props.id}
      </Type>
    </View>
  );
};

export default CollapsedInfoCard;
