import React, {useEffect, useState} from 'react';
import {ScrollView, FlatList, Text, View, Keyboard} from 'react-native';

import {
  SceneBuilder,
  Type,
  Header,
  ListItem,
  ItemSeparator,
  ListFooter,
  FloatingButton,
  InputBox,
} from '../components/Shared';
import {VIBRANTS, PRIMARY} from '../constants/colors';
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {FOOD, OUTLETS} from '../constants/strings';

import {getEateries} from '../services/firestore';
import {scoreSort} from '../utils/eateries';
import FloatingPill from '../components/Eateries/FloatingPill';
import SearchBox from '../components/Eateries/SearchBox';
import SearchResults from '../components/Eateries/SearchResults';

const EateriesScene = ({navigation}) => {
  const [eateries, setEateries] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Keyboard.addListener('keyboardDidHide', () => {
  //   setSearchQuery('');
  //   setIsSearching(false);
  // });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const eateriesData = await getEateries();
    if (eateriesData.exists) {
      let objData = eateriesData.data();
      let arrData = [];
      Object.keys(objData).forEach((eatery) => {
        arrData.push(objData[eatery]);
      });
      console.log(arrData);
      setEateries(arrData);
    }
  };

  const renderer = ({item}) => (
    <TouchableOpacity
      key={item.slug}
      activeOpacity={0.75}
      onPress={() => {
        navigation.navigate('MenuScene', {info: {...item}, slug: item.slug});
        // navigation.navigate('MenuScene', {slug: item.slug});
        // navigation.navigate('MenuScene');
      }}>
      <ListItem navigation={navigation} data={item} />
      <ListItem navigation={navigation} data={item} />
      <ListItem navigation={navigation} data={item} />
      <ListItem navigation={navigation} data={item} />
      <ListItem navigation={navigation} data={item} />
      <ListItem navigation={navigation} data={item} />
    </TouchableOpacity>
  );

  const eateriesHeader = () => (
    <Type style={{fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>
      {OUTLETS.HEADING}
    </Type>
  );
  const eateriesFooter = () => <ListFooter msg="That's all folks!" />;
  return (
    <>
      <SceneBuilder>
        <Header
          heading={FOOD.HEADING}
          navigation={navigation}
          iconName="settings-sharp"
        />

        <SearchBox
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />

        {isSearching && (
          <SearchResults searchQuery={searchQuery} isSearching={isSearching} />
        )}

        {!isSearching && (
          <FlatList
            ListHeaderComponent={eateriesHeader}
            ListFooterComponent={eateriesFooter}
            data={scoreSort(eateries)}
            keyExtractor={(eatery) => eatery.slug}
            renderItem={renderer}
            ItemSeparatorComponent={ItemSeparator}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SceneBuilder>

      {!isSearching && <FloatingPill />}
    </>
  );
};

export default EateriesScene;
