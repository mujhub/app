import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';

import {ROUNDNESS} from '../../styles/theme';

const SearchBoxButton = ({handleSearch}) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
      }}>
      <TouchableOpacity style={{flexDirection: 'row'}} onPress={handleSearch}>
        <View
          style={{
            width: '100%',
            height: 45,
            backgroundColor: colors.surface,
            borderRadius: ROUNDNESS / 2,
            justifyContent: 'center',
          }}>
          <Type style={{marginHorizontal: ROUNDNESS, color: colors.disabled}}>
            <Icon
              name="search"
              style={{
                marginHorizontal: ROUNDNESS,
                color: colors.disabled,
              }}
            />
            {'  SEARCH ITEMS'}
          </Type>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBoxButton;
