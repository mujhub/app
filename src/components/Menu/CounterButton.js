import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  ToastAndroid,
  ViewPropTypes,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {PRIMARY, VIBRANTS} from '../../constants/colors';
import {Type} from '../Shared';

const {width, height} = Dimensions.get('screen');

const CounterBtn = ({onAdd, onSubtract, id, price, max}) => {
  const [count, setCount] = useState(0);
  const [selector, setSelector] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    if (typeof price === 'object') {
      setSelector(true);
      setAdding(true);
    } else {
      if (count < max) {
        setCount(count + 1);
        onAdd({id, priceIndex: 0, price});
      } else
        ToastAndroid.show(
          `Can not add more than ${max} items`,
          ToastAndroid.SHORT,
        );
    }
  };
  const handleSub = () => {
    if (typeof price === 'object') {
      setSelector(true);
      setAdding(false);
    } else {
      setCount(count - 1);
      onSubtract({id, priceIndex: 0, price});
    }
  };

  const handleAddSelector = ({priceIndex}) => {
    if (count < max) {
      setCount(count + 1);
      onAdd({id, priceIndex, price: price[priceIndex]});
    } else
      ToastAndroid.show(
        `Can not add more than ${max} items`,
        ToastAndroid.SHORT,
      );
    setSelector(false);
  };

  const handleSubSelector = ({priceIndex}) => {
    let has = onSubtract({id, priceIndex, price: price[priceIndex]});
    if (has) setCount(count - 1);

    setSelector(false);
  };

  useEffect(() => {}, [count]);

  return (
    <View collapsable={false}>
      {!selector && (
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
      )}

      {selector && (
        <View style={{flexDirection: 'row'}}>
          {price.map((e, i) => (
            <TouchableOpacity
              key={i}
              style={{paddingHorizontal: 3}}
              onPress={() => {
                if (adding) handleAddSelector({priceIndex: i});
                else handleSubSelector({priceIndex: i});
              }}>
              <View
                style={{
                  backgroundColor: adding ? VIBRANTS.GREEN1 : VIBRANTS.RED,
                  padding: 2,
                  borderRadius: 16,
                }}>
                <Text
                  style={{
                    fontSize: width / 28,
                    paddingHorizontal: 3,
                    color: 'white',
                  }}>
                  {`₹${e}`}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default CounterBtn;
