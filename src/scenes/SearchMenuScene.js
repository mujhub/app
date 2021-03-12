import React, {useState} from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import MenuList from '../components/Menu/MenuList';

const {width, height} = Dimensions.get('screen');

const SearchMenuScene = ({route, navigation}) => {
  return (
    <ScrollView
      keyboardDismissMode={'none'}
      keyboardShouldPersistTaps={'handled'}>
      <View style={{minHeight: height}}>
        <MenuList
          data={route.params.data}
          navigation={navigation}
          isSearching={true}
        />
      </View>
    </ScrollView>
  );
};

export default SearchMenuScene;
