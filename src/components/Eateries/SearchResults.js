import React, {useEffect, useState} from 'react';
import {View, Dimensions, FlatList} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {Type, ItemSeparator, ListItem, FoodType} from '../Shared';

import {getSearchResults} from '../../services/firestore';
import {VIBRANTS, TYPE} from '../../constants/colors';
import {scoreSort} from '../../utils/eateries';
import {OUTLETS} from '../../constants/strings';
import {logUniversalSearch} from '../../services/analytics';
// import {logMenuFetch} from '../services/analytics';

const {width, height} = Dimensions.get('screen');

const SearchResults = ({isSearching, searchQuery, navigation}) => {
  const {colors} = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(searchQuery);
  const [results, setResults] = useState({});

  const getResults = async (query) => {
    setIsLoading(true);
    let res = await getSearchResults(query);
    logUniversalSearch({query});
    setIsLoading(false);
    setResults({...res.data()});
  };

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (query.length === 3) getResults(query.toLowerCase());
  }, [query]);

  if (query.length < 1) {
    return null;
  }

  if (query.length < 3 && query.length > 0) {
    return (
      <View>
        <Type style={{color: colors.disabled}}>
          {OUTLETS.SEARCH_PRE_MIN_CHARS}
        </Type>
      </View>
    );
  }

  //   if (isLoading)
  //     return (
  //       <View>
  //         <Type>Loading..</Type>
  //       </View>
  //     );

  //   if (!isLoading)

  return (
    <View>
      {Object.entries(results).length === 0 ? (
        <View>
          <Type style={{color: colors.disabled}}>
            {OUTLETS.SEARCH_EMPTY_RESULT}
          </Type>
        </View>
      ) : (
        Object.keys(results).map(
          (key, i) =>
            results[key].name
              .toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1 && (
              <TouchableOpacity
                key={i.toString()}
                activeOpacity={0.75}
                onPress={() => {
                  // logMenuFetch({name: item.slug});
                  navigation.navigate('MenuScene', {
                    slug: results[key].eatery,
                  });
                }}>
                <View
                  style={{
                    backgroundColor:
                      i % 2 === 0 ? colors.disabled + '25' : null,
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                  }}>
                  <View>
                    <Type
                      style={{
                        fontSize: width / 24,
                        paddingVertical: 5,
                      }}>
                      {results[key].eatery}
                    </Type>
                  </View>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {/* type and name */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 5,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <FoodType type={results[key].type} />
                        <Type
                          style={{
                            fontSize: width / 25,
                            // margin: 2,
                          }}>
                          {results[key].name}
                        </Type>
                      </View>
                    </View>

                    {/* price */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Type
                        style={{
                          fontSize: width / 30,
                          // margin: 2,
                          color: colors.disabled,
                        }}>
                        ₹
                      </Type>
                      <Type style={{fontSize: width / 25, margin: 2}}>
                        {typeof key.price === 'object'
                          ? results[key].price.map((p, i) =>
                              i < results[key].price.length - 1 ? p + ', ' : p,
                            )
                          : results[key].price}
                      </Type>
                    </View>
                  </View>
                </View>
                <ItemSeparator />
              </TouchableOpacity>
            ),
        )
      )}
    </View>
  );
};

export default SearchResults;
