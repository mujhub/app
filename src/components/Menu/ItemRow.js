import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Type} from '../Shared';

const {width, height} = Dimensions.get('screen');

const ItemRow = ({item, i}) => {
  const {colors} = useTheme();

  return (
    <View
      key={i.toString()}
      style={{paddingVertical: 5, paddingHorizontal: 10}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 2,
          paddingHorizontal: 5,
          backgroundColor: i % 2 ? null : colors.disabled + '55',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Type style={{fontSize: width / 25, margin: 2}}>{item.name}</Type>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Type
              style={{fontSize: width / 30, margin: 2, color: colors.disabled}}>
              ₹
            </Type>
            <Type style={{fontSize: width / 30, margin: 2}}>{item.price}</Type>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemRow;
