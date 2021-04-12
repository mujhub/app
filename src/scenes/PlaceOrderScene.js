import React, {useContext, useState, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';

import {UserAuth} from '../contexts/UserAuth';
import {getEateryBySlug} from '../services/firestore';

import {
  Type,
  PrivateNavigator,
  SceneBuilder,
  PrimaryButton,
} from '../components/Shared';
import {ActivityIndicator} from 'react-native-paper';
import {PRIMARY} from '../constants/colors';
import {isOpen} from '../utils/misc';
import ItemRow from '../components/Menu/ItemRow';
import {ScrollView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');

const PlaceOrderScene = ({route, navigation}) => {
  const {user} = useContext(UserAuth);
  const [loading, setLoading] = useState(true);
  const [outletInfo, setOutletInfo] = useState(null);
  const [outletMenu, setOutletMenu] = useState(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const [cart, setCart] = useState([]);
  const [invoice, setInvoice] = useState([]);

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
              pre_cart.push({...menuItem, price: menuItem.price[price_index]});
            } else {
              pre_cart.push({...menuItem, price: menuItem.price});
            }
            setCart(pre_cart);
          });

          break;
        }
      }
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
            <View style={{minHeight: height - 30}}>
              <ScrollView>
                <Type>{JSON.stringify(user.uid)}</Type>
                <Type>{JSON.stringify(outletInfo)}</Type>
                {/* <Type>{JSON.stringify(outletMenu)}</Type> */}
                <Type>{JSON.stringify(slug)}</Type>
                {/* <Type>{JSON.stringify(data)}</Type> */}
                {cart.map((cartItem, i) => (
                  <ItemRow item={cartItem} i={i} />
                ))}
                <Type>{`Total Amount: ${cartTotal}`}</Type>
              </ScrollView>
              <View style={{position: 'absolute', bottom: 50, width: '100%'}}>
                <PrimaryButton>PLACE ORDER</PrimaryButton>
              </View>
            </View>
          ) : (
            <Type>
              The restaurant is not not accepting orders at the moment
            </Type>
          )
        ) : (
          <ActivityIndicator color={PRIMARY} size={28} />
        )}
      </SceneBuilder>
    </View>
  );
};

export default PlaceOrderScene;
