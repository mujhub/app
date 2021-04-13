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
import {PRIMARY} from '../constants/colors';
import {isOpen} from '../utils/misc';
import ItemRow from '../components/Menu/ItemRow';
import {CART} from '../constants/strings';

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
  const [tableNumber, setTableNumber] = useState('');

  const {slug, data, cartTotal} = route.params;

  const fetchData = async () => {
    try {
      setLoading(true);
      //   let slug = route.params.slug;
      if (!slug) return;
      const res = await getEateryBySlug(slug);
      //   console.log('fetched');
      if (!res.exists) return;
      let data = res.data();
      //   console.log(JSON.stringify(data));
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
          console.log('cartItem', cartItem[menuItem.id].priceIndices);

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
            console.log(`==== precart ==== ${pre_cart}`);
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
          true ? (
            <View style={{minHeight: height - 30}}>
              <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
                <ScrollView>
                  <Type>{JSON.stringify(user.uid)}</Type>
                  <Type>{JSON.stringify(outletInfo)}</Type>
                  <Type>{JSON.stringify(slug)}</Type>
                  {cart.map((cartItem, i) => (
                    <ItemRow item={cartItem} i={i} />
                  ))}
                  <Type>{`${CART.INVOICE.TOTAL_LABEL} ${cartTotal}`}</Type>
                </ScrollView>
                <View style={{minHeight: 200}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <InputBox
                      viewStyle={{width: '50%'}}
                      value={tableNumber}
                      onChangeText={(value) => setTableNumber(value)}
                      label={CART.INVOICE.ADDITIONAL}
                      isRequired={true}
                    />

                    <Type
                      style={{
                        fontSize: 16,
                        flex: 1,
                        padding: 10,
                        textAlign: 'right',
                        textAlignVertical: 'bottom',
                      }}>
                      {`${CART.INVOICE.PAYABLE_LABEL} ₹${cartTotal}`}
                    </Type>
                  </View>
                  <PrimaryButton onPress={handlePlaceOrder}>
                    {CART.INVOICE.ACTION}
                  </PrimaryButton>
                </View>
              </KeyboardAvoidingView>
            </View>
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
