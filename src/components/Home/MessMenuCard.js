import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from 'react-native-paper';

import {Type, Badge, ItemSeparator} from '../Shared';
import {ROUNDNESS} from '../../styles/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {getMessMenu} from '../../services/firestore';
import {MESS} from '../../constants/strings';
import {VIBRANTS} from '../../constants/colors';

const {width, height} = Dimensions.get('screen');

const MessMenuCard = () => {
  const {colors} = useTheme();
  const collapsedCardRef = useRef();
  const expandedCardRef = useRef();
  const cardHeight = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(false);

  // ANIMATION
  const ANIMATION_DURATION = 300;
  const [collapsedCardHeight, setCollapsedCardHeight] = useState(0);
  const [expandedCardHeight, setExpandedCardHeight] = useState(0);
  const [hasCardExpanded, setCardExpanded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (collapsedCardRef.current) {
        collapsedCardRef.current.measure((_x, _y, _ox, oy) => {
          setCollapsedCardHeight(oy + 25);
        });
      }
      if (expandedCardRef.current) {
        expandedCardRef.current.measure((_x, _y, _ox, oy) => {
          setExpandedCardHeight(oy + 25);
        });
      }
    }, 50);
  }, [isLoading]);

  useEffect(() => {
    animateCollapseCard();
  }, [collapsedCardHeight, expandedCardHeight]);

  const animateExpandCard = () => {
    Animated.timing(cardHeight, {
      toValue: expandedCardHeight,
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();

    Animated.timing(textOpacity, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const animateCollapseCard = () => {
    Animated.timing(cardHeight, {
      toValue: collapsedCardHeight,
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();

    Animated.timing(textOpacity, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const toggleExpand = () => {
    if (hasCardExpanded) {
      animateCollapseCard();
    } else {
      animateExpandCard();
    }
    setCardExpanded(!hasCardExpanded);
  };

  // DATA

  const CURR_MEAL = 0;
  const [menuData, setMenuData] = useState([]);
  const [updatedAt, setUpdatedAt] = useState('');

  const CollapsedCardData = () => {
    return Object.keys(menuData).map((category, i) =>
      i === CURR_MEAL ? (
        <View key={i.toString()}>
          <Type
            style={{
              fontSize: width / 22,
              fontWeight: 'bold',
              marginTop: 15,
            }}>
            {menuData[category].name
              ? menuData[category].name.toUpperCase() + ' MENU'
              : ''}
          </Type>
          <Type
            style={{
              fontSize: width / 28,
              color: colors.disabled,
              fontWeight: 'bold',
            }}>
            {menuData[category].startsAt && menuData[category].endsAt
              ? `${menuData[category].startsAt} - ${menuData[category].endsAt}`
              : ''}
          </Type>
          {menuData[category].isSpecial ? (
            <Badge name="star" color={VIBRANTS.YELLOW} />
          ) : null}
          <Type style={{marginTop: 10, fontSize: width / 26}}>
            {menuData[category].menu.length > 0 ? (
              menuData[category].menu.map((item, i) =>
                i < menuData[category].menu.length - 1 ? item + ', ' : item,
              )
            ) : (
              <Type>{MESS.NULL_MENU}</Type>
            )}
          </Type>
        </View>
      ) : null,
    );
  };

  const ExpandedCardData = () => {
    return Object.keys(menuData).map((category, i) => (
      <View key={i.toString()}>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <Type
            style={{
              fontSize: width / 26,
              fontWeight: 'bold',
            }}>
            {menuData[category].name
              ? menuData[category].name.toUpperCase()
              : ''}
          </Type>
          <Type
            style={{
              fontSize: width / 32,
              color: colors.disabled,
              fontWeight: 'bold',
              textAlignVertical: 'center',
              marginLeft: 5,
            }}>
            {menuData[category].startsAt && menuData[category].endsAt
              ? `${menuData[category].startsAt} - ${menuData[category].endsAt}`
              : ''}
          </Type>
          {menuData[category].isSpecial ? (
            <Badge name="star" color={VIBRANTS.YELLOW} />
          ) : null}
        </View>

        <Type style={{fontSize: width / 26}}>
          {menuData[category].menu.length > 0 ? (
            menuData[category].menu.map((item, i) =>
              i < menuData[category].menu.length - 1 ? item + ', ' : item,
            )
          ) : (
            <Type>{MESS.NULL_MENU}</Type>
          )}
        </Type>
        <View style={{marginVertical: 15}}>
          {i < menuData.length - 1 ? (
            <ItemSeparator widthPercentage="100%" />
          ) : null}
        </View>
      </View>
    ));
  };

  const UpdatedAtDate = () => {
    let updatedAtDate = '';
    try {
      let date = new Date(updatedAt.seconds * 1000);
      updatedAtDate = `${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}`;
    } catch (error) {
      console.log(error);
    }
    return <Type>{updatedAtDate}</Type>;
  };

  const getData = async () => {
    setIsLoading(true);
    const res = await getMessMenu();
    console.log(JSON.stringify(res.data()));
    const data = res.data();
    setMenuData(data.meals ? data.meals : []);
    setUpdatedAt(data.updatedAt);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return !isLoading ? (
    <View>
      <Type
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          marginHorizontal: 15,
          marginVertical: 5,
          color: colors.disabled,
        }}>
        {MESS.HEADING}
      </Type>
      <Animated.View
        style={[
          {
            width: '100%',
            backgroundColor: colors.elevated,
            borderRadius: ROUNDNESS,
            overflow: 'hidden',
          },
          {height: cardHeight},
        ]}>
        <Animated.View
          collapsable={false}
          ref={collapsedCardRef}
          style={[
            {
              padding: 20,
              position: 'absolute',
            },
            {
              opacity: Animated.subtract(1, textOpacity),
            },
          ]}>
          <UpdatedAtDate />
          <CollapsedCardData />
        </Animated.View>

        <Animated.View
          collapsable={false}
          ref={expandedCardRef}
          style={[
            {
              padding: 20,
              position: 'absolute',
            },
            {
              opacity: textOpacity,
            },
          ]}>
          <Type style={{marginVertical: 10}}>
            {'Mess Menu  '}
            <UpdatedAtDate />
          </Type>
          <ExpandedCardData />
        </Animated.View>

        <TouchableWithoutFeedback onPress={toggleExpand}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              paddingHorizontal: 20,
              paddingVertical: 5,
              marginBottom: 15,
            }}>
            <Type
              style={{
                fontWeight: 'bold',
                color: colors.primary,
                textAlign: 'right',
              }}>
              {!hasCardExpanded ? (
                <Icon name="chevron-down" size={width / 25} />
              ) : (
                <Icon name="chevron-up" size={width / 25} />
              )}
              {!hasCardExpanded ? 'VIEW ALL' : 'CLOSE'}
            </Type>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  ) : (
    <ActivityIndicator color="white" size={28} />
  );
};

export default MessMenuCard;
