import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import {useTheme} from 'react-native-paper';

import {Type} from '../Shared';

import {getSearchResults} from '../../services/firestore';
import {OUTLETS} from '../../constants/strings';
import {logUniversalSearch} from '../../services/analytics';

const {width, height} = Dimensions.get('screen');

const SearchResults = ({isSearching, searchQuery}) => {
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
      <View
        style={{
          position: 'absolute',
          width,
        }}>
        <Type style={{color: colors.disabled}}>
          {OUTLETS.SEARCH_EMPTY_RESULT}
        </Type>
      </View>
      {Object.keys(results).map(
        (item, i) =>
          results[item].name.toString().toLowerCase().indexOf(query) > -1 && (
            <View key={i.toString()}>
              <Type>{JSON.stringify(results[item])}</Type>
            </View>
          ),
      )}
    </View>
  );
};

export default SearchResults;
