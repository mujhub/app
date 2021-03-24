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

const EateriesScene = ({navigation}) => {
  const [eateries, setEateries] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

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

        <InputBox
          value={'Search'}
          // onChangeText={(value) => setSearchQuery(value)}
          label={OUTLETS.SEARCH_BOX_PLACEHOLDER}
          onFocus={() => {
            setIsSearching(true);
          }}
          viewStyle={{marginBottom: 15, marginTop: 15, padding: 2}}
          cancellable={isSearching}
          onCancel={() => {
            setIsSearching(false);
            Keyboard.dismiss();
          }}
        />

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
      {!isSearching && (
        <FloatingButton icon="scan" iconColor="white" color={PRIMARY}>
          <Type style={{marginHorizontal: 8}}>{OUTLETS.SCANNER_TEXT}</Type>
        </FloatingButton>
      )}
    </>
  );
};

export default EateriesScene;
