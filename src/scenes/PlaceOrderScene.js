import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  Alert,
  ScrollView,
  DeviceEventEmitter,
  KeyboardAvoidingView,
  ActivityIndicator,
  ToastAndroid,
  StatusBar,
} from 'react-native';

import {UserAuth} from '../contexts/UserAuth';
import messaging from '../services/messaging';
import {getEateryBySlug} from '../services/firestore';
import {placeOrder} from '../services/api';

import {
  Type,
  PrivateNavigator,
  SceneBuilder,
  PrimaryButton,
  InputBox,
  Header,
} from '../components/Shared';
import ItemRow from '../components/Menu/ItemRow';

import {isOpen} from '../utils/misc';
import {PRIMARY} from '../constants/colors';
import {CART, ORDER} from '../constants/strings';
import InvoiceList from '../components/Menu/InvoiceList';
import {mmkvDefaultBlock} from '../utils/storage';
import {useTheme} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');

const PlaceOrderScene = ({route, navigation}) => {
  const {user} = useContext(UserAuth);
  const [loading, setLoading] = useState(true);
  const [outletInfo, setOutletInfo] = useState(null);
  const [outletMenu, setOutletMenu] = useState(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState('');

  const {colors, isDark} = useTheme();

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
      let blockData = await mmkvDefaultBlock();
      if (blockData.status) setAdditionalInfo(blockData.block);
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
      if (!additionalInfo) {
        ToastAndroid.show('Please input block number', ToastAndroid.SHORT);
        return;
      }
      setPlacingOrder(true);
      let itemIds = data.map((item) => Object.keys(item)[0]);
      let items = [];
      itemIds.forEach((itemId, i) => {
        items.push({itemId, variants: data[i][itemId].priceIndices});
      });
      let block = additionalInfo;
      let token = null;
      try {
        token = await messaging().getToken();
      } catch (error) {
        console.log(error);
      }
      let success = await placeOrder({items, shop: slug, block, token});
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
      let {opens_at, closes_at, is_open} = outletInfo;
      setIsStoreOpen(is_open);
      let is_accepting = isOpen({opens_at, closes_at});
      setIsAccepting(is_accepting);
      buildCart();
    }
  }, [outletInfo, loading]);

  if (!route.params.data) navigation.goBack();

  return (
    <View>
      <PrivateNavigator user={user} navigation={navigation} />
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <SceneBuilder>
        <Header heading={ORDER.HEADING} navigation={navigation} />
        {!loading ? (
          isAccepting && isStoreOpen ? (
            <InvoiceList
              cart={cart}
              cartTotal={cartTotal}
              additionalInfo={additionalInfo}
              setAdditionalInfo={setAdditionalInfo}
              handlePlaceOrder={handlePlaceOrder}
              placingOrder={placingOrder}
              user={user}
              outletInfo={outletInfo}
              slug={slug}
            />
          ) : (
            <View style={{marginVertical: 50, marginHorizontal: 7}}>
              <Type style={{fontSize: 22}}>{CART.INVOICE.NOT_ACCEPTING}</Type>
            </View>
          )
        ) : (
          <ActivityIndicator color={PRIMARY} size={28} />
        )}
      </SceneBuilder>
    </View>
  );
};

export default PlaceOrderScene;
