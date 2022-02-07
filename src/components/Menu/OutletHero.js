import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  Dimensions,
  StatusBar,
  Platform,
  ScrollView,
  TouchableOpacity,
  Linking,
  Animated,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import {CustomTheme} from '../../contexts/CustomTheme';
import {Type, ItemSeparator, PrimaryButton} from '../Shared';
import {VIBRANTS, PRIMARY} from '../../constants/colors';
import {isOpen, payUPI} from '../../utils/misc';
import {OUTLETS} from '../../constants/strings';
import {logPayment} from '../../services/analytics';

const {width, height} = Dimensions.get('screen');

const OutletHero = ({yOffset, offset, onParallaxImageScrolled, outletInfo}) => {
  const data = {
    title: '',
    description: '',
    location: '',
    opens_at: '',
    closes_at: '',
    offers: [],
    cover: '',
    ...outletInfo,
  };

  const {isDarkMode} = useContext(CustomTheme);
  const {colors} = useTheme();

  const HEIGHT_FACTOR = 3;
  const headerHeight = offset.interpolate({
    inputRange: [0, 300],
    outputRange: [height / HEIGHT_FACTOR, 0],
    extrapolate: 'clamp',
  });
  const [isReadMore, setIsReadMore] = useState(true);
  const [isOutletOpen, setIsOutletOpen] = useState(true);

  useEffect(() => {
    setIsOutletOpen(
      isOpen({opens_at: data.opens_at, closes_at: data.closes_at}),
    );
  }, [data.closes_at, data.opens_at, outletInfo]);

  return (
    <>
      <StatusBar
        translucent={true}
        barStyle={'light-content'}
        backgroundColor={'#00000050'}
      />

      <ScrollView>
        <Animated.View
          style={{
            height: headerHeight,
            overflow: 'hidden',
          }}>
          <Image
            source={{uri: data.cover}}
            style={{
              height: height / HEIGHT_FACTOR,
            }}
            resizeMode="cover"
            resizeMethod="resize"
          />
        </Animated.View>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0)']}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />

        <View style={{backgroundColor: colors.background}}>
          <View style={{margin: 20}}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}>
                <View style={{marginBottom: 5}}>
                  <View>
                    <Type
                      style={{
                        fontSize: width / 20,
                        fontWeight: 'bold',
                      }}>
                      {data.title}
                    </Type>
                  </View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: width / 28,
                      color: isOutletOpen ? VIBRANTS.GREEN2 : VIBRANTS.RED,
                      marginTop: 10,
                    }}>
                    {isOutletOpen ? OUTLETS.OPEN : OUTLETS.CLOSE}
                    <Text
                      style={{
                        color: colors.disabled,
                      }}>{` - ${data.opens_at} - ${data.closes_at}`}</Text>
                  </Text>

                  <Text
                    style={{
                      fontSize: width / 30,
                      marginTop: 10,
                      color: colors.disabled,
                    }}>
                    <Icon name="location-outline" />
                    {' ' + data.location}
                  </Text>
                </View>
                <PrimaryButton
                  mode="outlined"
                  onPress={() => {
                    payUPI({
                      payments: outletInfo.payments,
                      title: outletInfo.title,
                    });
                  }}>
                  <Type style={{color: colors.primary}}>{OUTLETS.PAYMENT}</Type>
                </PrimaryButton>
              </View>

              <TouchableOpacity
                style={{marginTop: 10}}
                onPress={() => setIsReadMore(!isReadMore)}>
                <Text style={{fontSize: width / 28, color: colors.text}}>
                  {isReadMore
                    ? data.description.substr(0, 80)
                    : data.description}
                  {isReadMore && (
                    <Text
                      style={{fontSize: width / 28, color: colors.disabled}}>
                      {data.description.length > 80 ? ' ...more' : ''}
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>

              <View style={{marginTop: 20}}>
                {data.offers.length > 0 &&
                  data.offers.map((offer, i) => (
                    <View key={i.toString()}>
                      <ItemSeparator widthPercentage="100%" opacityHex="ff" />
                      <View style={{marginVertical: 20}}>
                        <Type
                          style={{
                            color: VIBRANTS.GREEN1,
                            fontWeight: 'bold',
                            marginBottom: 8,
                          }}>
                          {offer.heading}
                        </Type>
                        <Type style={{lineHeight: 24}}>{offer.body}</Type>
                      </View>
                    </View>
                  ))}
                <ItemSeparator widthPercentage="100%" opacityHex="ff" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default OutletHero;
