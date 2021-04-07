import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';

import {Type} from '../Shared';
import {VIBRANTS, TYPE} from '../../constants/colors';
import SearchBox from './SearchBox';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ROUNDNESS} from '../../styles/theme';

const {width, height} = Dimensions.get('screen');

const MenuList = ({data, navigation, isSearching}) => {
  const {colors} = useTheme();

  const [categorizedObj, setCategorizedObj] = useState({});

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

  const handleSearch = () => {
    navigation.navigate('SearchMenuScene', {data});
  };

  const renderType = (type) => {
    let icon = '';
    let color = null;
    switch (type) {
      case 0:
        icon = 'ellipse';
        color = TYPE.VEG;
        break;
      case 1:
        icon = 'egg';
        color = TYPE.EGG;
        break;
      case 2:
        icon = 'ellipse';
        color = TYPE.NON;
        break;

      default:
        // icon = 'ellipse';
        // color = TYPE.VEG;
        break;
    }
    return (
      <Icon
        name={icon}
        size={width / 28}
        color={color}
        style={{marginHorizontal: 5}}
      />
    );
  };

  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <View style={{marginVertical: 10, marginHorizontal: 10}}>
      {!isSearching ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={handleSearch}>
            <View
              style={{
                width: '100%',
                height: 45,
                backgroundColor: colors.surface,
                borderRadius: ROUNDNESS / 2,
                justifyContent: 'center',
              }}>
              <Type
                style={{marginHorizontal: ROUNDNESS, color: colors.disabled}}>
                <Icon
                  name="search"
                  style={{marginHorizontal: ROUNDNESS, color: colors.disabled}}
                />
                {'  SEARCH ITEMS'}
              </Type>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <SearchBox
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          navigation={navigation}
        />
      )}

      {/* <Type>{JSON.stringify(categorizedObj)}</Type> */}
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

            {/* <Type>{JSON.stringify(categorizedObj[category])}</Type> */}
            {categorizedObj[category].map((item, i) => (
              <View key={i.toString()}>
                {searchLogicItem(item, searchQuery) && (
                  <View
                    style={{
                      backgroundColor: i % 2 ? colors.disabled + '25' : null,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 2,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          maxWidth: '60%',
                        }}>
                        {renderType(item.type)}
                        <Type
                          style={{
                            fontSize: width / 25,
                            margin: 2,
                          }}>
                          {item.name}
                        </Type>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Type
                          style={{
                            fontSize: width / 30,
                            margin: 2,
                            color: colors.disabled,
                          }}>
                          ₹
                        </Type>
                        <Type style={{fontSize: width / 25, margin: 2}}>
                          {typeof item.price === 'object'
                            ? item.price.map((p, i) =>
                                i < item.price.length - 1 ? p + '-' : p,
                              )
                            : item.price}
                        </Type>
                      </View>
                    </View>
                    {`${item.description}`.length > 0 ? (
                      <View style={{marginBottom: 15}}>
                        <Type
                          style={{
                            fontSize: width / 30,
                            lineHeight: 20,
                            marginTop: 8,
                            margin: 2,
                            marginLeft: width / 28 + 12,
                          }}>
                          {item.description ? item.description : ''}
                        </Type>
                      </View>
                    ) : null}
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default MenuList;
