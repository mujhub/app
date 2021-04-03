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
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {CustomTheme} from '../../contexts/CustomTheme';
import {Type, ItemSeparator, PrimaryButton} from '../Shared';
import {VIBRANTS, PRIMARY} from '../../constants/colors';
import {isOpen} from '../../utils/misc';
import {OUTLETS} from '../../constants/strings';
import {logPayment} from '../../services/analytics';

const {width, height} = Dimensions.get('screen');

const OutletHero = ({
  yOffset,
  onParallaxImageScrolled,
  headingTint,
  setHeadingTint,
  outletInfo,
}) => {
  const data = {
    title: '',
    description: '',
    location: '',
    opens_at: '',
    closes_at: '',
    offers: [],
    ...outletInfo,
    cover: 'https://picsum.photos/300/300/?blur',
  };

  const {isDarkMode} = useContext(CustomTheme);
  const {colors} = useTheme();

  const HEIGHT_FACTOR = 3;
  const [parallaxMultiplier, setParallaxMultiplier] = useState(1);
  const [parallaxOpacity, setParallaxOpacity] = useState(1);
  const [statusColor, setStatusColor] = useState('#0005');
  const [statusStyle, setStatusStyle] = useState('light-content');
  const [isReadMore, setIsReadMore] = useState(true);

  const [isOutletOpen, setIsOutletOpen] = useState(true);

  useEffect(() => {
    console.log('====', JSON.stringify(outletInfo));
    setIsOutletOpen(
      isOpen({opens_at: data.opens_at, closes_at: data.closes_at}),
    );
  }, [outletInfo]);

  useEffect(() => {
    // console.log(yOffset);
    // console.log(yOffset / (height / (HEIGHT_FACTOR * parallaxMultiplier)));
    // console.log(headingTint);

    setParallaxMultiplier(yOffset != 0 ? 0.01 * yOffset + 1 : 1);
    setParallaxOpacity(
      1 - yOffset / (height / (HEIGHT_FACTOR * parallaxMultiplier) - 30),
    );
    if (yOffset / (height / (HEIGHT_FACTOR * parallaxMultiplier)) < 1) {
      setHeadingTint(
        255 * (1 - yOffset / (height / (HEIGHT_FACTOR * parallaxMultiplier))),
      );
    }

    if (yOffset + 30 > height / (HEIGHT_FACTOR * parallaxMultiplier)) {
      setStatusColor(colors.elevated);
      setStatusStyle(isDarkMode ? 'light-content' : 'dark-content');
      if (onParallaxImageScrolled) {
        onParallaxImageScrolled(true);
      }
    } else {
      setStatusColor('#0005');
      setStatusStyle('light-content');
      if (onParallaxImageScrolled) {
        onParallaxImageScrolled(false);
      }
    }
  }, [yOffset]);

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={statusColor}
        barStyle={statusStyle}
      />

      <ScrollView>
        <Image
          source={{uri: data.cover}}
          style={{
            width,
            height: height / (HEIGHT_FACTOR * parallaxMultiplier),
            opacity: parallaxOpacity,
          }}
          resizeMode="cover"
          resizeMethod="resize"
        />

        <View
          style={{
            position: 'absolute',
            top: height / (2 * HEIGHT_FACTOR),
            opacity: parallaxOpacity,
          }}>
          <View style={{width}}>
            <Type
              style={{
                fontSize: width / 13,
                color: 'white',
                fontWeight: 'bold',
                textShadowColor: 'black',
                textShadowRadius: 30,
                textAlign: 'center',
              }}
              viewStyle={{margin: 10}}>
              {data.title}
            </Type>
          </View>
        </View>

        <View style={{backgroundColor: colors.background}}>
          <View style={{margin: 20, marginTop: 10}}>
            <View style={{marginHorizontal: 5}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
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
                    Linking.canOpenURL('upi://pay').then((can) => {
                      if (can) {
                        logPayment({name: data.slug});
                        Linking.openURL(
                          'upi://pay?pa=dustspeck@kotak&pn=Vaibhav Garg',
                        );
                      }
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
                          }}>
                          {offer.heading}
                        </Type>
                        <Type>{offer.body}</Type>
                      </View>
                    </View>
                  ))}
                <ItemSeparator widthPercentage="100%" opacityHex="ff" />
              </View>
            </View>
          </View>

          {/* <TouchableOpacity
            activeOpacity={0.75}
            style={{
              position: 'absolute',
              top: -width / 14,
              right: width / 14,
              height: width / 7,
              width: width / 7,
              borderRadius: width / 14,
              backgroundColor: PRIMARY,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: parallaxOpacity,
              elevation: 5,
            }}>
            <Icon name="call" size={width / 18} color="white" />
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </>
  );
};

export default OutletHero;
