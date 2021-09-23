import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Switch,
  ToastAndroid,
} from 'react-native';
import {useTheme} from 'react-native-paper';

import {Type, Badge, ItemSeparator} from '../Shared';
import {ROUNDNESS} from '../../styles/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {getMessMenu} from '../../services/firestore';
import {MESS} from '../../constants/strings';
import {VIBRANTS} from '../../constants/colors';
import {logMessMenu} from '../../services/analytics';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ToggleSwitch from '../Shared/ToggleSwitch';
import {mmkvMessMenuSubscription} from '../../utils/storage';
import {subscribeMessUpdate} from '../../services/messaging';

const {width, height} = Dimensions.get('screen');

const MessMenuCard = () => {
  const {colors} = useTheme();
  const contractedCardRef = useRef();
  const expandedCardRef = useRef();
  const cardHeight = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(false);

  // ANIMATION
  const ANIMATION_DURATION = 220;
  const [contractedCardHeight, setContractedCardHeight] = useState(0);
  const [expandedCardHeight, setExpandedCardHeight] = useState(0);
  const [hasCardExpanded, setCardExpanded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (contractedCardRef.current) {
        contractedCardRef.current.measure((_x, _y, _ox, oy) => {
          setContractedCardHeight(oy + 25);
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
    animateContractCard();
  }, [animateContractCard, contractedCardHeight, expandedCardHeight]);

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

  const animateContractCard = () => {
    Animated.timing(cardHeight, {
      toValue: contractedCardHeight,
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
      animateContractCard();
    } else {
      animateExpandCard();
    }
    setCardExpanded(!hasCardExpanded);
  };

  // DATA

  const [ongoingMeal, setOngoingMeal] = useState(0);
  const [menuData, setMenuData] = useState([]);
  const [updatedAt, setUpdatedAt] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Refresh mess menu
  const [isRefreshEnabled, setIsRefreshEnabled] = useState(false);

  const updateSubscription = async (value) => {
    const {status} = await mmkvMessMenuSubscription(`${value}`);
    if (status) {
      console.log(typeof status, status);
      setIsSubscribed(value === 'true' || value ? true : false);
      subscribeMessUpdate(value);
      ToastAndroid.show(
        value ? 'Subscribed' : 'Unsubscribed',
        ToastAndroid.SHORT,
      );
    }
  };

  const ContractedCardData = () => {
    return (
      <View style={{minWidth: '100%'}}>
        {Object.keys(menuData).map((category, i) =>
          i === ongoingMeal ? (
            <View key={i.toString()}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                }}>
                <Type
                  style={{
                    fontSize: width / 28,
                    fontWeight: 'bold',
                    marginTop: 16,
                  }}>
                  {menuData[category].name
                    ? menuData[category].name.toUpperCase() + ' MENU'
                    : ''}
                </Type>
                {menuData[category].isSpecial ? (
                  <Badge
                    style={{
                      position: 'relative',
                      marginLeft: 5,
                    }}
                    name="star"
                    color={VIBRANTS.YELLOW}
                  />
                ) : null}
                <Type
                  style={{
                    textAlign: 'right',
                    flexGrow: 2,
                    fontSize: width / 30,
                    color: colors.disabled,
                    fontWeight: 'bold',
                  }}>
                  {menuData[category].startsAt && menuData[category].endsAt
                    ? `${menuData[category].startsAt} - ${menuData[category].endsAt}`
                    : ''}
                </Type>
              </View>

              <Type
                style={{
                  lineHeight: 22,
                  marginTop: 16,
                  fontSize: width / 28,
                  marginBottom: 16,
                }}>
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
        )}
      </View>
    );
  };

  const ExpandedCardData = () => {
    return Object.keys(menuData).map((category, i) => (
      <View key={i.toString()} style={{minWidth: '100%', position: 'relative'}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 2,
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}>
          <Type
            style={{
              fontSize: width / 28,
              fontWeight: 'bold',
            }}>
            {menuData[category].name
              ? menuData[category].name.toUpperCase()
              : ''}
          </Type>
          {menuData[category].isSpecial ? (
            <Badge
              style={{position: 'relative', marginLeft: 5}}
              name="star"
              color={VIBRANTS.YELLOW}
            />
          ) : null}
          <Type
            style={{
              fontSize: width / 30,
              color: colors.disabled,
              fontWeight: 'bold',
              textAlignVertical: 'center',
              marginLeft: 5,
              textAlign: 'right',
              flexGrow: 2,
            }}>
            {menuData[category].startsAt && menuData[category].endsAt
              ? `${menuData[category].startsAt} - ${menuData[category].endsAt}`
              : ''}
          </Type>
        </View>

        <Type
          style={{
            fontSize: width / 28,
            lineHeight: 22,
            marginTop: 16,
          }}>
          {menuData[category].menu.length > 0 ? (
            menuData[category].menu.map((item, i) =>
              i < menuData[category].menu.length - 1 ? item + ', ' : item,
            )
          ) : (
            <Type>{MESS.NULL_MENU}</Type>
          )}
        </Type>
        <View style={{marginVertical: 16}}>
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
      updatedAtDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
    } catch (error) {
      console.log(error);
    }
    return <Type style={{color: colors.disabled}}>{updatedAtDate}</Type>;
  };

  const getData = async () => {
    const {status} = await mmkvMessMenuSubscription();
    console.log('status', status);
    if (status) setIsSubscribed(true);
    setIsLoading(true);
    const res = await getMessMenu();
    console.log(JSON.stringify(res.data()));
    const data = res.data();

    setMenuData(data.meals ? data.meals : []);
    setUpdatedAt(data.updatedAt);
    setIsLoading(false);
  };

  const refreshTimeHandler = () => {
    setIsRefreshEnabled(!isRefreshEnabled);
  };

  useEffect(() => {
    try {
      let dt = new Date();
      let currHour = dt.getHours();
      setOngoingMeal(menuData.length > 0 ? menuData.length - 1 : 0);
      for (let i = 0; i < menuData.length; i++) {
        const meal = menuData[i];
        if (!meal.endsAt) break;

        if (meal.endsAt.slice(0, 2) >= currHour) {
          if (meal.menu.length === 0) {
            setOngoingMeal(i > 0 ? i - 1 : i);
          } else {
            setOngoingMeal(i);
          }
          break;
        }
      }
      logMessMenu({meal: menuData[ongoingMeal].name});
      mmkvMessMenuSubscription().then(({status, value}) => {
        if (status) setIsSubscribed(value === 'true' ? true : false);
      });
    } catch (error) {}
  }, [menuData, ongoingMeal]);

  useEffect(() => {
    // on clicking the refresh button the state will go from
    // refresh enabled to not enabled
    // initially its false
    if (!isRefreshEnabled) {
      getData();
      // wait for 1 min to allow user to refresh
      const timer = setTimeout(() => {
        setIsRefreshEnabled(!isRefreshEnabled);
      }, 60 * 1000 * 1);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isRefreshEnabled]);

  return !isLoading ? (
    <View>
      <Animated.View
        style={[
          {
            width: '100%',
            backgroundColor: colors.elevated,
            borderRadius: ROUNDNESS,
            overflow: 'hidden',
            marginTop: 30,
          },
          {height: cardHeight},
        ]}>
        <Animated.View
          collapsable={false}
          ref={contractedCardRef}
          style={[
            {
              padding: 16,
              position: 'absolute',
            },
            {
              opacity: Animated.subtract(1, textOpacity),
            },
          ]}>
          <Type style={{color: colors.disabled}}>
            {MESS.HEADING + ' '}
            <UpdatedAtDate />
          </Type>
          <ContractedCardData />
        </Animated.View>

        <Animated.View
          collapsable={false}
          ref={expandedCardRef}
          style={[
            {
              padding: 16,
              position: 'absolute',
            },
            {
              opacity: textOpacity,
            },
          ]}>
          <Type style={{marginBottom: 16, color: colors.disabled}}>
            {MESS.HEADING + ' '}
            <UpdatedAtDate />
          </Type>
          <ExpandedCardData />
          <ToggleSwitch
            value={isSubscribed}
            label={MESS.NOTIFICATION_SUBSCRIPTION}
            labelColor={colors.disabled}
            onChange={updateSubscription}
          />
        </Animated.View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            // marginTop: 25,
            justifyContent: 'space-between',
            alignItems: 'baseline',
            position: 'absolute',
            bottom: 0,
            paddingHorizontal: 16,
            paddingVertical: 2,
            marginBottom: 16,
          }}>
          {/* ------------------------ */}
          {/* ------ UPDATE TIME ----- */}
          {/* ------------------------ */}
          <TouchableOpacity
            disabled={!isRefreshEnabled}
            onPress={refreshTimeHandler}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Type
                style={{
                  color: isRefreshEnabled ? colors.primary : colors.disabled,
                }}>
                {isRefreshEnabled ? (
                  <Icon name="refresh-circle" size={18} />
                ) : (
                  <Icon name="checkmark-circle" size={18} />
                )}
              </Type>
              <Type
                style={{
                  color: isRefreshEnabled ? colors.text : colors.disabled,
                  marginLeft: 5,
                }}>
                {!isRefreshEnabled ? 'Updated Recently' : 'Refresh'}
              </Type>
            </View>
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={toggleExpand}>
            <View>
              <Type
                style={{
                  fontWeight: 'bold',
                  color: colors.primary,
                }}>
                {/* {!hasCardExpanded ? (
                <Icon name="chevron-down" size={width / 25} />
              ) : (
                <Icon name="chevron-up" size={width / 25} />
              )} */}
                {!hasCardExpanded ? MESS.EXPAND_CARD : MESS.CONTRACT_CARD}
              </Type>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Animated.View>
    </View>
  ) : (
    <ActivityIndicator color="white" size={28} />
  );
};

export default MessMenuCard;
