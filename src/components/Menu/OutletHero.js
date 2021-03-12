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
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {CustomTheme} from '../../contexts/CustomTheme';
import {Type, ItemSeparator} from '../Shared';
import {VIBRANTS, PRIMARY} from '../../constants/colors';

const {width, height} = Dimensions.get('screen');

const OutletHero = ({
  yOffset,
  onParallaxImageScrolled,
  headingTint,
  setHeadingTint,
}) => {
  const data = {
    // cover:
    //   'https://images.unsplash.com/photo-1571951753447-4841fa61ed5c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80',
    cover:
      'https://www.rennie.co.uk/static/media/images/content/articles/foods-to-avoid-spicy-food.jpg',
    title: 'Indian Food Hotel',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor leo a diam sollicitudin.',
    location: 'B2 Ground Floor',
  };

  const {isDarkMode} = useContext(CustomTheme);
  const {colors} = useTheme();

  const HEIGHT_FACTOR = 3;
  const [parallaxMultiplier, setParallaxMultiplier] = useState(1);
  const [parallaxOpacity, setParallaxOpacity] = useState(1);
  const [statusColor, setStatusColor] = useState('#0005');
  const [statusStyle, setStatusStyle] = useState('light-content');
  const [isReadMore, setIsReadMore] = useState(true);

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
              Indian Food Hotel
            </Type>
          </View>
        </View>

        <View style={{backgroundColor: colors.background}}>
          <View style={{margin: 20, marginTop: 10}}>
            <View style={{marginHorizontal: 5}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: width / 28,
                  color: VIBRANTS.GREEN2,
                  marginTop: 10,
                }}>
                Open Now
                <Text style={{color: colors.disabled}}> - 11am - 11pm</Text>
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
                      {' ...more'}
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>

              <View style={{marginTop: 20}}>
                <ItemSeparator widthPercentage="100%" opacityHex="ff" />
                <View style={{marginVertical: 20}}>
                  <Type style={{color: VIBRANTS.GREEN1, fontWeight: 'bold'}}>
                    Limited Time Offer
                  </Type>

                  <Type>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mattis elementum odio egestas est commodo, netus fusce sit
                    amet.
                  </Type>
                </View>
                <ItemSeparator widthPercentage="100%" opacityHex="ff" />
              </View>
            </View>
          </View>

          <View
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
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default OutletHero;
