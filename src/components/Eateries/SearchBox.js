import React from 'react';
import {View, Text, Keyboard} from 'react-native';
import {InputBox} from '../Shared';
import {OUTLETS} from '../../constants/strings';

const SearchBox = ({
  searchQuery,
  setSearchQuery,
  isSearching,
  setIsSearching,
}) => {
  return (
    <InputBox
      value={searchQuery}
      onChangeText={(value) => setSearchQuery(value)}
      label={OUTLETS.SEARCH_BOX_PLACEHOLDER}
      onFocus={() => {
        setIsSearching(true);
      }}
      viewStyle={{marginBottom: 15, marginTop: 15, padding: 2}}
      cancellable={isSearching}
      onCancel={() => {
        setIsSearching(false);
        setSearchQuery('');
        Keyboard.dismiss();
      }}
    />
  );
};

export default SearchBox;
