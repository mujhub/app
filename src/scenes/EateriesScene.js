import React, {useEffect, useState} from 'react';
import {FlatList, View, Dimensions} from 'react-native';

import {
  SceneBuilder,
  Type,
  Header,
  ListItem,
  ItemSeparator,
  ListFooter,
  ThemedModal,
  ThemeControl,
} from '../components/Shared';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FOOD, OUTLETS} from '../constants/strings';

import {getEateries} from '../services/firestore';
import {scoreSort} from '../utils/eateries';
import FloatingPill from '../components/Eateries/FloatingPill';
import SearchBox from '../components/Eateries/SearchBox';
import SearchResults from '../components/Eateries/SearchResults';
import {logMenuFetch} from '../services/analytics';
import SDRBuilder from '../components/Eateries/SDRBuilders/SDRBuilders';

const {width, height} = Dimensions.get('screen');

const EateriesScene = ({navigation}) => {
  const [eateries, setEateries] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  useEffect(() => {
    fetchData();
  }, []);

  const renderer = ({item}) =>
    item.is_visible && (
      <TouchableOpacity
        key={item.slug}
        activeOpacity={0.75}
        onPress={() => {
          logMenuFetch({name: item.slug});
          navigation.navigate('MenuScene', {info: {...item}, slug: item.slug});
        }}>
        <ListItem navigation={navigation} data={item} />
        {/* <ListItem navigation={navigation} data={item} />
      <ListItem navigation={navigation} data={item} />
      <ListItem navigation={navigation} data={item} />
      <ListItem navigation={navigation} data={item} />
      <ListItem navigation={navigation} data={item} /> */}
      </TouchableOpacity>
    );

  const eateriesHeader = () => (
    <>
      <SDRBuilder />
      <Type style={{fontSize: width / 26, fontWeight: 'bold', marginTop: 8}}>
        {OUTLETS.HEADING}
      </Type>
    </>
  );
  const eateriesFooter = () => <ListFooter msg="That's all folks!" />;

  return (
    <>
      <SceneBuilder>
        <Header
          heading={FOOD.HEADING}
          navigation={navigation}
          iconNames={['time']}
          iconActions={[
            () => {
              navigation.navigate('OrderHistoryScreen');
            },
          ]}
        />

        <SearchBox
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />

        {isSearching && (
          <SearchResults
            searchQuery={searchQuery}
            isSearching={isSearching}
            navigation={navigation}
          />
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

      {!isSearching && <FloatingPill navigation={navigation} />}
    </>
  );
};

export default EateriesScene;
