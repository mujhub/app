import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  Alert,
  ScrollView,
  DeviceEventEmitter,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';

import {UserAuth} from '../contexts/UserAuth';
import {getEateryBySlug, placeOrder} from '../services/firestore';

import {
  Type,
  PrivateNavigator,
  SceneBuilder,
  PrimaryButton,
  InputBox,
} from '../components/Shared';
import ItemRow from '../components/Menu/ItemRow';

import {isOpen} from '../utils/misc';
import {PRIMARY} from '../constants/colors';
import {CART} from '../constants/strings';
import InvoiceList from '../components/Menu/InvoiceList';

const {width, height} = Dimensions.get('screen');

const PlaceOrderScene = ({route, navigation}) => {
  const {user} = useContext(UserAuth);
  const [loading, setLoading] = useState(true);
  const [outletInfo, setOutletInfo] = useState(null);
  const [outletMenu, setOutletMenu] = useState(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const [cart, setCart] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState('');

  const {slug, data, cartTotal} = route.params;

  const fetchData = async () => {
    try {
      setLoading(true);
      if (!slug) return;
      const res = await getEateryBySlug(slug);
      if (!res.exists) return;
      let data = res.data();
      let info = data.info;
      if (info) setOutletInfo(info);
      let menu = data.menu;
      if (menu) setOutletMenu(menu);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const buildCart = () => {
    setCart([]);
    for (let i = 0; i < data.length; i++) {
      const cartItem = data[i];
      const cartItemKeys = Object.keys(data[i]);
      for (let j = 0; j < outletMenu.length; j++) {
        const menuItem = outletMenu[j];
        if (cartItemKeys[0] === menuItem.id) {
          let itemPrices = cartItem[menuItem.id].priceIndices;
          itemPrices.forEach((price_index) => {
            let pre_cart = cart;
            if (typeof menuItem.price === 'object') {
              pre_cart.push({
                ...menuItem,
                price: menuItem.price[price_index],
                count: itemPrices.length,
              });
            } else {
              pre_cart.push({...menuItem, price: menuItem.price, count: 1});
            }
            setCart(pre_cart);
          });
          break;
        }
      }
    }
  };

  const handlePlaceOrder = async () => {
    try {
      setPlacingOrder(true);
      let success = await placeOrder({uid: user.uid, slug, data});
      if (success) {
        DeviceEventEmitter.emit('event.clearCart');
        Alert.alert(CART.ORDER_SUCCESS.HEADING, CART.ORDER_SUCCESS.BODY, [
          {
            text: CART.ORDER_SUCCESS.ACTION,
            onPress: () => {
              navigation.popToTop();
            },
          },
        ]);
      } else {
        Alert.alert(CART.ORDER_FAILURE.HEADING, CART.ORDER_FAILURE.BODY, [
          {text: CART.ORDER_FAILURE.ACTION, onPress: () => navigation.goBack()},
        ]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPlacingOrder(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      let {opens_at, closes_at} = outletInfo;
      let is_accepting = isOpen({opens_at, closes_at});
      setIsAccepting(is_accepting);
      buildCart();
    }
  }, [outletInfo, loading]);

  if (!route.params.data) navigation.goBack();

  return (
    <View>
      <PrivateNavigator user={user} navigation={navigation} />
      <SceneBuilder>
        {!loading ? (
          isAccepting ? (
            <InvoiceList
              cart={cart}
              cartTotal={cartTotal}
              additionalInfo={additionalInfo}
              setAdditionalInfo={setAdditionalInfo}
              handlePlaceOrder={handlePlaceOrder}
              user={user}
              outletInfo={outletInfo}
              slug={slug}
            />
          ) : (
            <Type>{CART.INVOICE.NOT_ACCEPTING}</Type>
          )
        ) : (
          <ActivityIndicator color={PRIMARY} size={28} />
        )}
      </SceneBuilder>
    </View>
  );
};

export default PlaceOrderScene;
