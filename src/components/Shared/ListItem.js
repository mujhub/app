import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {useTheme} from 'react-native-paper';

import {ROUNDNESS} from '../../styles/theme';
import {Type} from '.';
import {nameInitials} from '../../utils/misc';
import Icon from 'react-native-vector-icons/Ionicons';
import {VIBRANTS} from '../../constants/colors';
import {Badge} from '.';

const {width, height} = Dimensions.get('screen');

const ListItem = ({navigation, data}) => {
  const {colors} = useTheme();
  return (
    <View style={{flexDirection: 'row', width: '100%'}}>
      <View
        style={{
          width: width / 7,
          height: width / 7,
          backgroundColor: data.tint,
          borderRadius: ROUNDNESS / 2,
          marginVertical: 20,
          marginHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {data.featured === true && (
          <Badge name="star" color={VIBRANTS.YELLOW} />
        )}

        <Type style={{fontSize: width / 18, color: colors.text + 'aa'}}>
          {data.name ? nameInitials(data.name) : null}
        </Type>
      </View>
      <View
        style={{
          marginVertical: 20,
          marginHorizontal: 10,
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <Type style={{fontSize: width / 24, color: colors.text}}>
            {data.name}
          </Type>
          <Type style={{fontSize: width / 26, color: colors.disabled}}>
            {data.time}
          </Type>
        </View>
        <Type style={{fontSize: width / 26, color: colors.disabled}}>
          {data.desc}
        </Type>
      </View>
    </View>
  );
};

export default ListItem;
