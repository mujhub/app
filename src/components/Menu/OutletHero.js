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
import LinearGradient from 'react-native-linear-gradient';

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
    cover: 'https://picsum.photos/seed/picsum/400/300/',
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
  }, [data.closes_at, data.opens_at, outletInfo]);

  useEffect(() => {
    // console.log(yOffset);
    // console.log(yOffset / (height / (HEIGHT_FACTOR * parallaxMultiplier)));
    // console.log(headingTint);
    setParallaxMultiplier(yOffset !== 0 ? 0.01 * yOffset + 1 : 1);
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
  }, [
    colors.elevated,
    isDarkMode,
    onParallaxImageScrolled,
    parallaxMultiplier,
    setHeadingTint,
    yOffset,
  ]);

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={statusColor}
        barStyle={statusStyle}
      />

      <ScrollView>
        <View ref={(r) => (this.image = r)}>
          <Image
            source={{uri: data.cover}}
            style={{
              height: height / (HEIGHT_FACTOR * parallaxMultiplier),
              opacity: parallaxOpacity,
            }}
            resizeMode="cover"
            resizeMethod="resize"
          />
          <LinearGradient
            ref={(r) => (this.gradiant = r)}
            locations={[0, 1.0]}
            colors={['rgba(0,0,0,10)', 'rgba(0,0,0,0.10)']}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          />
        </View>

        {/* ----------------------- */}
        {/* TEXT OVER IMAGE */}
        {/* ----------------------- */}
        {/* <View
          style={{
            position: 'absolute',
            top: height / (2 * HEIGHT_FACTOR),
            opacity: parallaxOpacity,
          }}>
          <View style={{width}}>
            <Type
              style={{
                fontSize: width / 14,
                color: 'white',
                fontWeight: 'bold',
                textShadowColor: 'rgba(0, 0, 0, 0.5)',
                textShadowRadius: 20,
                textAlign: 'center',
              }}
              viewStyle={{margin: 10}}>
              {data.title}
            </Type>
          </View>
        </View> */}
        {/* ------------------------ */}

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
