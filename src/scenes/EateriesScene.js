import React, {useEffect, useState, useRef} from 'react';
import {Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import {FlatList, View, ScrollView, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';

import {logMenuFetch} from '../services/analytics';
import {getEateries, getEateriesComponents} from '../services/firestore';
import {VIBRANTS} from '../constants/colors';
import {scoreSort} from '../utils/eateries';
import {payUPI, placeCall} from '../utils/misc';
import {mmkvEateriesCards, mmkvEateriesList} from '../utils/storage';

import {SceneBuilder, Type, Header, ListItem} from '../components/Shared';
import {ItemSeparator, ThemedModal, ThemeControl} from '../components/Shared';
import {ListFooter} from '../components/Shared';
import {FOOD, OUTLETS} from '../constants/strings';
import FloatingPill from '../components/Eateries/FloatingPill';
import SearchBox from '../components/Eateries/SearchBox';
import SearchResults from '../components/Eateries/SearchResults';
import SDRBuilder from '../components/Eateries/SDRBuilders/SDRBuilders';
import AnimatedMount from '../components/Shared/AnimatedMount';

const EateriesScene = ({navigation}) => {
  const {width, height} = Dimensions.get('screen');
  const {colors} = useTheme();
  const openRow = useRef([]);
  const [eateries, setEateries] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cards, setCards] = useState([]);

  const fetchData = async () => {
    let fetched = false;
    try {
      setIsSyncing(true);
      const cachedEateries = mmkvEateriesList().then((data) => {
        if (!fetched && data.status) {
          if (typeof data.value === 'object' && data.value !== null) {
            if (data.value.length > 0) {
              setEateries(data.value);
            }
          }
        }
      });
      const eateriesData = await getEateries();
      if (eateriesData.exists) {
        fetched = true;
        let objData = eateriesData.data();
        let arrData = [];
        Object.keys(objData).forEach((eatery) => {
          arrData.push(objData[eatery]);
        });
        setEateries(arrData);
        mmkvEateriesList(arrData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSyncing(false);
    }
  };

  const fetchCards = async () => {
    let fetched = false;
    try {
      mmkvEateriesCards().then((data) => {
        if (!fetched && data.status) {
          if (typeof data.value === 'object' && data.value !== null) {
            if (data.value.cards) setCards(data.value.cards);
          }
        }
      });
      let res = await getEateriesComponents();
      fetched = true;
      if (res.exists) {
        const remoteData = res.data();
        if (remoteData) {
          if (remoteData.cards) setCards(remoteData.cards);
          mmkvEateriesCards(remoteData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCards();
  }, []);

  const handleRightSwipe = async (item) => {
    await payUPI({payments: item.payments, title: item.title});
  };
  const handleLeftSwipe = async (item) => {
    await placeCall({contact: item.contact, name: item.title});
  };

  const leftSwipeActions = () => {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[VIBRANTS.GREEN1, VIBRANTS.GREEN2]}
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 45,
          }}>
          <Text
            style={{
              fontSize: 16,
              marginRight: 48,
              color: `${colors.text}99`,
              fontWeight: 'bold',
            }}>
            CALL
          </Text>
          <IonIcon name="arrow-forward" size={20} color={`${colors.text}99`} />
        </View>
      </LinearGradient>
    );
  };
  const rightSwipeActions = () => {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[VIBRANTS.BLUE2, VIBRANTS.BLUE1]}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 45,
          }}>
          <IonIcon name="arrow-back" size={20} color={`${colors.text}99`} />
          <Text
            style={{
              fontSize: 16,
              marginLeft: 48,
              color: `${colors.text}99`,
              fontWeight: 'bold',
            }}>
            PAY
          </Text>
        </View>
      </LinearGradient>
    );
  };

  const renderer = ({item, index}) =>
    item.is_visible && (
      <Swipeable
        ref={(ref) => (openRow.current[index] = ref)}
        friction={1.5}
        key={item.slug}
        onSwipeableOpen={() => {
          openRow.current.forEach((row) => {
            row.close();
          });
        }}
        onSwipeableLeftOpen={() => {
          handleLeftSwipe(item);
        }}
        onSwipeableRightOpen={() => {
          handleRightSwipe(item);
        }}
        renderLeftActions={leftSwipeActions}
        renderRightActions={rightSwipeActions}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MenuScene', {
              info: {...item},
              slug: item.slug,
            });
          }}
          activeOpacity={1}>
          <ListItem navigation={navigation} data={item} />
        </TouchableOpacity>
      </Swipeable>
    );

  const eateriesHeader = () => (
    <>
      {/* --> Removed SDRBuilder from FlatList header, as it causes rerendering  */}
      {/* <SDRBuilder cards={cards} /> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 8,
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <Type style={{fontSize: width / 26, fontWeight: 'bold'}}>
          {OUTLETS.HEADING}
        </Type>
        {isSyncing && (
          <View style={{flexDirection: 'row'}}>
            <ActivityIndicator color={colors.disabled} />
            <Type
              style={{
                fontSize: width / 30,
                marginHorizontal: 5,
                color: colors.disabled,
              }}>
              Syncing
            </Type>
          </View>
        )}
      </View>
    </>
  );
  const eateriesFooter = () => <ListFooter msg="That's all folks!" />;

  return (
    <>
      <SceneBuilder>
        <Header
          heading={FOOD.HEADING}
          navigation={navigation}
          // iconNames={['time']}
          // iconActions={[
          //   () => {
          //     navigation.navigate('OrderHistoryScreen');
          //   },
          // ]}
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
        {/* --> Causes Virtual List nesting warning, try and find another way. */}
        <ScrollView>
          {!isSearching && cards.length > 0 && (
            <AnimatedMount maxHeight={height / 6}>
              <SDRBuilder cards={cards} />
            </AnimatedMount>
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
        </ScrollView>
      </SceneBuilder>

      {/* {!isSearching && <FloatingPill navigation={navigation} />} */}
    </>
  );
};

export default EateriesScene;
