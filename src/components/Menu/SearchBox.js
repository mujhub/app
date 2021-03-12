import React, {useContext} from 'react';
import {View, Text, StatusBar, Keyboard} from 'react-native';
import {useTheme} from 'react-native-paper';

import {CustomTheme} from '../../contexts/CustomTheme';
import {InputBox} from '../Shared';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBox = ({searchQuery, setSearchQuery, navigation}) => {
  const {isDarkMode} = useContext(CustomTheme);
  const {colors} = useTheme();

  const handleBack = () => {
    Keyboard.dismiss();
    navigation.goBack();
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 30,
          paddingBottom: 10,
          backgroundColor: colors.background,
          flexDirection: 'row',
        }}>
        <Icon
          name="chevron-back"
          color={colors.text}
          size={24}
          onPress={handleBack}
          style={{
            textAlignVertical: 'center',
            marginRight: 15,
            marginTop: 25,
          }}
        />
        <InputBox
          value={searchQuery}
          onChangeText={(value) => setSearchQuery(value)}
          label={'Search (Cuisine / Item / Content)'}
          autoFocus={true}
          viewStyle={{flex: 1}}
        />
      </View>
    </>
  );
};

export default SearchBox;
