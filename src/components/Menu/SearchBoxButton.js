import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {Type} from '../Shared';

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
            borderColor: colors.text,
            borderWidth: 0.5,
            borderRadius: ROUNDNESS / 2,
            justifyContent: 'center',
          }}>
          <Type style={{marginHorizontal: ROUNDNESS, color: colors.text}}>
            <Icon
              name="search"
              style={{
                marginHorizontal: ROUNDNESS,
                color: colors.text,
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
