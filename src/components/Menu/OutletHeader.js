import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Linking,
  Animated,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {GRAY, VIBRANTS} from '../../constants/colors';
import {FOOD} from '../../constants/strings';
import {isOpen, payUPI} from '../../utils/misc';
import {Type} from '../Shared';

const {width, height} = Dimensions.get('screen');

const OutletHeader = ({handleBack, outletInfo, offset}) => {
  const data = {
    title: '',
    ...outletInfo,
  };
  const headerOpacity = offset.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerPosition = offset.interpolate({
    inputRange: [0, 150],
    outputRange: [-150, 0],
    extrapolate: 'clamp',
  });

  const {colors} = useTheme();
  const [isOutletOpen, setIsOutletOpen] = useState(false);
  useEffect(() => {
    setIsOutletOpen(
      isOpen({opens_at: data.opens_at, closes_at: data.closes_at}),
    );
  }, [data.closes_at, data.opens_at, outletInfo]);

  return (
    <>
      <Animated.View
        style={{
          paddingTop: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          opacity: headerOpacity,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={handleBack} activeOpacity={0.75}>
            <Icon
              name="chevron-back"
              size={24}
              style={{
                marginVertical: 17,
                marginHorizontal: 10,
                color: GRAY.T2,
              }}
            />
          </TouchableOpacity>

          <Type
            style={{
              marginTop: 16,
              fontSize: width / 24,
              color: GRAY.T2,
            }}
            viewStyle={{margin: 10}}>
            Food
          </Type>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          paddingTop: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          top: headerPosition,
          backgroundColor: colors.surface,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={handleBack} activeOpacity={0.75}>
            <Icon
              name="chevron-back"
              size={24}
              style={{
                marginVertical: 17,
                marginHorizontal: 10,
                color: colors.text,
              }}
            />
          </TouchableOpacity>

          <Type
            style={{
              marginTop: 16,
              fontSize: width / 24,
            }}
            viewStyle={{margin: 10}}>
            {data.title}
          </Type>
        </View>

        <TouchableOpacity
          onPress={() => {
            payUPI({payments: outletInfo.payments, title: outletInfo.title});
          }}
          activeOpacity={0.75}>
          <Icon
            name="wallet-outline"
            size={25}
            style={{
              margin: 10,
              marginHorizontal: 20,
              color: colors.text,
            }}
          />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default OutletHeader;
