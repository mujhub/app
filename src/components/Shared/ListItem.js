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
          width: width / 8,
          height: width / 8,
          backgroundColor: data.tint,
          borderRadius: ROUNDNESS / 4,
          marginVertical: 18,
          marginRight: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {data.is_featured === true && (
          <Badge name="star" color={VIBRANTS.YELLOW} />
        )}

        <Type style={{fontSize: width / 20, color: colors.text + 'aa'}}>
          {data.title ? nameInitials(data.title) : null}
        </Type>
      </View>
      <View
        style={{
          marginVertical: 18,
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
            {data.title}
          </Type>
          <Type style={{fontSize: width / 30, color: colors.disabled}}>
            {`${data.opens_at} - ${data.closes_at}`}
          </Type>
        </View>
        <Type style={{fontSize: width / 28, color: colors.disabled}}>
          {data.description.substr(0, 25)}
          {data.description.length > 25 ? '...' : ''}
        </Type>
      </View>
    </View>
  );
};

export default ListItem;
