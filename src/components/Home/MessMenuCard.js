import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import {useTheme} from 'react-native-paper';

import {Type} from '../Shared';
import {ROUNDNESS} from '../../styles/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('screen');

const data = [
  {name: 'Chapati', mealTime: 'BREAKFAST', timestamp: 0},
  {name: 'Rajma', mealTime: 'BREAKFAST', timestamp: 0},
  {name: 'Matar Paneer', mealTime: 'BREAKFAST', timestamp: 0},
  {name: 'Fryums', mealTime: 'BREAKFAST', timestamp: 0},
  {name: 'Pickle', mealTime: 'BREAKFAST', timestamp: 0},
  {name: 'Rice', mealTime: 'BREAKFAST', timestamp: 0},
  {name: 'Chana', mealTime: 'BREAKFAST', timestamp: 0},
  {name: 'Chapati', mealTime: 'LUNCH', timestamp: 0},
  {name: 'Rajma', mealTime: 'LUNCH', timestamp: 0},
  {name: 'Matar Paneer', mealTime: 'LUNCH', timestamp: 0},
  {name: 'Fryums', mealTime: 'LUNCH', timestamp: 0},
  {name: 'Pickle', mealTime: 'LUNCH', timestamp: 0},
  {name: 'Rice', mealTime: 'LUNCH', timestamp: 0},
  {name: 'Chana', mealTime: 'LUNCH', timestamp: 0},
  {name: 'Chapati', mealTime: 'LUNCH', timestamp: 0},
  {name: 'Rajma', mealTime: 'HITEA', timestamp: 0},
  {name: 'Matar Paneer', mealTime: 'HITEA', timestamp: 0},
  {name: 'Fryums', mealTime: 'HITEA', timestamp: 0},
  {name: 'Pickle', mealTime: 'HITEA', timestamp: 0},
  {name: 'Rice', mealTime: 'DINNER', timestamp: 0},
  {name: 'Chana', mealTime: 'DINNER', timestamp: 0},
  {name: 'Chapati', mealTime: 'DINNER', timestamp: 0},
  {name: 'Rajma', mealTime: 'DINNER', timestamp: 0},
  {name: 'Matar Paneer', mealTime: 'DINNER', timestamp: 0},
  {name: 'Fryums', mealTime: 'DINNER', timestamp: 0},
  {name: 'Pickle', mealTime: 'DINNER', timestamp: 0},
  {name: 'Rice', mealTime: 'DINNER', timestamp: 0},
  {name: 'Chana', mealTime: 'DINNER', timestamp: 0},
];

const MessMenuCard = () => {
  const {colors} = useTheme();
  const collapsedCardRef = useRef();
  const expandedCardRef = useRef();
  const cardHeight = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  // ANIMATION
  const ANIMATION_DURATION = 200;
  const [collapsedCardHeight, setCollapsedCardHeight] = useState(0);
  const [expandedCardHeight, setExpandedCardHeight] = useState(0);
  const [hasCardExpanded, setCardExpanded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (collapsedCardRef.current) {
        collapsedCardRef.current.measure((_x, _y, _ox, oy) => {
          setCollapsedCardHeight(oy + 50);
        });
      }
      if (expandedCardRef.current) {
        expandedCardRef.current.measure((_x, _y, _ox, oy) => {
          setExpandedCardHeight(oy + 50);
        });
      }
    }, 1);
  }, []);

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
  const [categorizedMenu, setCategorizedMenu] = useState([]);

  useEffect(() => {
    let pre = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        let cat = data[key].mealTime;
        if (!pre[cat]) pre[cat] = [];
        pre[cat].push(data[key]);
      }
    }
    setCategorizedMenu(pre);
  }, []);

  return (
    <View>
      {/* <Type>{JSON.stringify(categorizedMenu)}</Type> */}
      <Type
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          marginHorizontal: 15,
          marginVertical: 5,
          color: colors.disabled,
        }}>
        {"Today's Mess Menu"}
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
          <Type>01 MAR 2021</Type>
          {Object.keys(categorizedMenu).map((category, i) =>
            i === CURR_MEAL ? (
              <View key={i.toString()}>
                <Type
                  style={{
                    fontSize: width / 22,
                    fontWeight: 'bold',
                    marginTop: 15,
                  }}>
                  {category + ' MENU'}
                </Type>
                <Type style={{marginTop: 10, fontSize: width / 26}}>
                  {categorizedMenu[category].map((item, i) =>
                    i < categorizedMenu[category].length - 1
                      ? item.name + ', '
                      : item.name,
                  )}
                </Type>
              </View>
            ) : null,
          )}
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
          <Type>Mess Menu - 01 MAR 2021</Type>
          {Object.keys(categorizedMenu).map((category, i) => (
            <View key={i.toString()}>
              <Type
                style={{
                  fontSize: width / 28,
                  fontWeight: 'bold',
                  marginTop: 15,
                }}>
                {category}
              </Type>
              <Type>
                {categorizedMenu[category].map((item, i) =>
                  i < categorizedMenu[category].length - 1
                    ? item.name + ', '
                    : item.name,
                )}
              </Type>
            </View>
          ))}
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
  );
};

export default MessMenuCard;
