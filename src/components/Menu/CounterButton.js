import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, ToastAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {PRIMARY} from '../../constants/colors';
import {Type} from '../Shared';

const {width, height} = Dimensions.get('screen');

const CounterBtn = ({onAdd, onSubtract, id, max}) => {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    if (count < max) {
      setCount(count + 1);
      onAdd({id, priceIndex: 1});
    } else
      ToastAndroid.show(
        `Can not add more than ${max} items`,
        ToastAndroid.SHORT,
      );
  };
  const handleSub = () => {
    setCount(count - 1);
    onSubtract({id, priceIndex: 1});
  };

  useEffect(() => {}, [count]);

  return (
    <View style={{flexDirection: 'row'}}>
      {count > 0 && (
        <TouchableOpacity onPress={handleSub}>
          <View
            style={{
              backgroundColor: PRIMARY,
              padding: 5,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}>
            <Text
              style={{
                fontSize: width / 28,
                paddingHorizontal: 3,
                color: 'white',
              }}>
              −
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {count < 1 && (
        <TouchableOpacity
          onPress={handleAdd}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            // backgroundColor: PRIMARY + '55',
            borderColor: PRIMARY,
            borderWidth: 0.5,
            borderRadius: 8,
          }}>
          <Text
            style={{
              textAlignVertical: 'center',
              fontSize: width / 28,
              color: 'white',
            }}>
            Add
          </Text>
        </TouchableOpacity>
      )}
      {count > 0 && (
        <Type
          style={{
            textAlignVertical: 'center',
            fontSize: width / 28,
            marginHorizontal: 10,
          }}>
          {count}
        </Type>
      )}
      {count > 0 && (
        <TouchableOpacity onPress={handleAdd}>
          <View
            style={{
              backgroundColor: PRIMARY,
              padding: 5,
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}>
            <Text
              style={{
                fontSize: width / 28,
                paddingHorizontal: 3,
                color: 'white',
              }}>
              +
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CounterBtn;
