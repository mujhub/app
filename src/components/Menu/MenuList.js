import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';

import SearchBox from './SearchBox';
import CounterBtn from './CounterButton';
import {Type, FoodType} from '../Shared';

import {VIBRANTS, TYPE} from '../../constants/colors';
import {ROUNDNESS} from '../../styles/theme';
import SearchBoxButton from './SearchBoxButton';
import MenuItem from './MenuItem';

const {width, height} = Dimensions.get('screen');

const MenuList = ({
  data,
  navigation,
  isSearching,
  cartItems,
  setCartItems,
  priceSelector,
  cartTotal,
  setCartTotal,
  cartCount,
  setCartCount,
}) => {
  const {colors} = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [categorizedObj, setCategorizedObj] = useState({});

  const addItem = ({id, priceIndex, price}) => {
    let items = cartItems;
    let cartIndex = -1;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item[id]) {
        cartIndex = i;
        break;
      }
    }
    setCartCount(cartCount + 1);
    let item = {[id]: {priceIndices: []}, ...items[cartIndex]};
    item[id].priceIndices.push(priceIndex);
    setCartTotal(cartTotal + price);
    if (cartIndex > -1) items.splice(cartIndex, 1);
    cartItems.push(item);
    setCartItems([...cartItems]);
  };

  const subtractItem = ({id, priceIndex, price}) => {
    let items = cartItems;
    let cartIndex = -1;
    setCartCount(cartCount - 1);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item[id]) {
        cartIndex = i;
        break;
      }
    }
    let item = {[id]: {priceIndices: []}, ...items[cartIndex]};

    //if price index in not in cart, do nothing
    if (item[id].priceIndices.indexOf(priceIndex) == -1) return false;

    let i = item[id].priceIndices.indexOf(priceIndex);
    if (i > -1) item[id].priceIndices.splice(i, 1);
    if (cartIndex > -1) items.splice(cartIndex, 1);
    if (item[id].priceIndices.length > 0) cartItems.push(item);
    setCartTotal(cartTotal - price);
    setCartItems([...cartItems]);
    return true;
  };

  const handleSearch = () => {
    navigation.navigate('SearchMenuScene', {data});
  };

  const searchLogicItem = (item, searchQuery) => {
    if (!isSearching) return true;
    if (item.category.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)
      return true;
    if (item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)
      return true;
    if (item.description)
      if (
        item.description.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
      )
        return true;
  };

  const searchLogicCategory = (category, searchQuery) => {
    if (!isSearching) return true;
    return false;
  };

  useEffect(() => {
    let pre = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        let cat = data[key].category;
        if (!pre[cat]) pre[cat] = [];
        pre[cat].push(data[key]);
      }
    }
    setCategorizedObj(pre);
  }, []);

  return (
    <View style={{marginVertical: 10, marginHorizontal: 10}}>
      {!isSearching ? (
        <SearchBoxButton handleSearch={handleSearch} />
      ) : (
        <SearchBox
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          navigation={navigation}
        />
      )}

      <View style={{marginTop: 20}}>
        {Object.keys(categorizedObj).map((category, i) => (
          <View key={i.toString()}>
            {searchLogicCategory(category, searchQuery) && (
              <Type
                style={{
                  fontWeight: 'bold',
                  fontSize: width / 22,
                  margin: 20,
                  marginTop: 30,
                  marginBottom: 10,
                }}>
                {category.toUpperCase()}
              </Type>
            )}

            {categorizedObj[category].map((item, i) => (
              <View key={i.toString()}>
                {searchLogicItem(item, searchQuery) && (
                  <MenuItem
                    i={i}
                    item={item}
                    showCounter={!isSearching}
                    addItem={addItem}
                    subtractItem={subtractItem}
                  />
                )}
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={{height: height / 8}}></View>
    </View>
  );
};

export default MenuList;
