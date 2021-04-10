import React from 'react';
import {View, Text, Keyboard} from 'react-native';
import {InputBox, Type} from '../Shared';
import {OUTLETS} from '../../constants/strings';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBox = ({
  searchQuery,
  setSearchQuery,
  isSearching,
  setIsSearching,
  navigation,
}) => {
  const {colors} = useTheme();
  const handleBack = () => {
    setIsSearching(false);
    setSearchQuery('');
    Keyboard.dismiss();
  };

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 8,
        }}>
        {searchQuery !== '' && isSearching ? (
          <Icon
            name="chevron-back"
            color={colors.text}
            size={24}
            onPress={handleBack}
            style={{
              textAlignVertical: 'center',
              marginRight: 10,
              marginTop: 15,
              marginLeft: 0,
            }}
          />
        ) : null}

        <InputBox
          value={searchQuery}
          onChangeText={(value) => setSearchQuery(value)}
          label={OUTLETS.SEARCH_BOX_PLACEHOLDER}
          onFocus={() => {
            setIsSearching(true);
          }}
          viewStyle={{marginBottom: 15, flex: 1}}
          cancellable={isSearching}
          onCancel={() => {
            setIsSearching(false);
            setSearchQuery('');
            Keyboard.dismiss();
          }}
        />
      </View>
    </>
  );
};

export default SearchBox;
