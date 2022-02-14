import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  Text,
  Alert,
  StatusBar,
  Platform,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
  DeviceEventEmitter,
  Animated,
} from 'react-native';
import {useTheme, ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {CustomTheme} from '../contexts/CustomTheme';
import OutletHero from '../components/Menu/OutletHero';
import OutletHeader from '../components/Menu/OutletHeader';
import MenuList from '../components/Menu/MenuList';
import {InputBox, Type, FloatingButton} from '../components/Shared';
import SearchBox from '../components/Menu/SearchBox';
import {getEateryBySlug} from '../services/firestore';
import {logMenuFetch} from '../services/analytics';
import {PRIMARY, VIBRANTS} from '../constants/colors';
import {OUTLETS, CART} from '../constants/strings';
import {logPlaceCall} from '../services/analytics';
import ViewCartButton from '../components/Menu/ViewCartButton';
import {placeCall} from '../utils/misc';

const {width, height} = Dimensions.get('screen');

const MenuScene = ({navigation, route}) => {
  const {colors} = useTheme();
  const {isDarkMode} = useContext(CustomTheme);
  const offset = useRef(new Animated.Value(0)).current;

  const handleBack = () => {
    navigation.goBack();
  };

  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [outletInfo, setOutletInfo] = useState(null);
  const [outletMenu, setOutletMenu] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [hasItemsInCart, setHasItemsInCart] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoadingMenu(true);
      let slug = route.params.slug;
      if (!slug) return;
      const res = await getEateryBySlug(slug);
      if (!res.exists) return;
      let data = res.data();
      logMenuFetch({name: slug});
      let info = data.info;
      if (info) setOutletInfo(info);
      let menu = data.menu;
      if (menu) setOutletMenu(menu);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingMenu(false);
    }
  };

  useEffect(() => {
    if (!route.params) navigation.goBack();
    else if (!route.params.slug) navigation.goBack();

    if (route.params.info) setOutletInfo(route.params.info);
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!hasItemsInCart) return;
      e.preventDefault();

      Alert.alert(CART.LEAVE_ORDER.HEADING, CART.LEAVE_ORDER.BODY, [
        {text: CART.LEAVE_ORDER.CANCEL, onPress: () => {}},
        {
          text: CART.LEAVE_ORDER.OK,
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]);
    });
    return unsubscribe;
  }, [navigation, hasItemsInCart]);

  DeviceEventEmitter.addListener('event.clearCart', () =>
    setHasItemsInCart(false),
  );

  useEffect(() => {
    setHasItemsInCart(cartItems.length > 0 ? true : false);
    let total = 0;
    cartItems.forEach((item) => {
      Object.keys(item).forEach((id) => {
        total += item[id].priceIndices.length;
      });
    });
    setCartItemsCount(total);
  }, [cartItems]);

  if (!route.params) return null;
  if (!route.params.slug) return null;

  return (
    outletInfo && (
      <>
        <ScrollView
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: offset}}}],
            {
              useNativeDriver: false,
            },
          )}
          stickyHeaderIndices={[1]}>
          <OutletHero offset={offset} outletInfo={outletInfo} />

          <View
            style={{
              position: 'absolute',
              width,
            }}>
            <OutletHeader
              offset={offset}
              handleBack={handleBack}
              outletInfo={outletInfo}
            />
          </View>

          {!isLoadingMenu && outletInfo ? (
            <View
              style={{minHeight: height, backgroundColor: colors.background}}>
              <MenuList
                hasCounter={outletInfo.is_online}
                cartCount={cartItemsCount}
                setCartCount={setCartItemsCount}
                data={outletMenu}
                navigation={navigation}
                cartItems={cartItems}
                setCartItems={setCartItems}
                cartTotal={cartTotal}
                setCartTotal={setCartTotal}
              />
            </View>
          ) : (
            <View
              style={{minHeight: height, backgroundColor: colors.background}}>
              <ActivityIndicator color={PRIMARY} size="large" />
            </View>
          )}
        </ScrollView>

        {cartItems.length ? (
          <ViewCartButton
            cartCount={cartItemsCount}
            data={cartItems}
            navigation={navigation}
            slug={route.params.slug}
            cartTotal={cartTotal}
          />
        ) : null}

        <View>
          <FloatingButton
            icon="call"
            iconColor="white"
            color={VIBRANTS.GREEN2}
            onPress={() => {
              placeCall({contact: outletInfo.contact, name: outletInfo});
            }}
          />
        </View>
      </>
    )
  );
};

export default MenuScene;
