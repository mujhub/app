import React, {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Linking,
  ToastAndroid,
} from 'react-native';

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
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LinearGradient from 'react-native-linear-gradient';
import {FOOD, OUTLETS} from '../constants/strings';

import {getEateries} from '../services/firestore';
import {scoreSort} from '../utils/eateries';
import FloatingPill from '../components/Eateries/FloatingPill';
import SearchBox from '../components/Eateries/SearchBox';
import SearchResults from '../components/Eateries/SearchResults';
import {logMenuFetch} from '../services/analytics';
import SDRBuilder from '../components/Eateries/SDRBuilders/SDRBuilders';
import {VIBRANTS} from '../constants/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';
import {payUPI, placeCall} from '../utils/misc';

const {width, height} = Dimensions.get('screen');

const EateriesScene = ({navigation}) => {
  const {colors} = useTheme();
  const [eateries, setEateries] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const openRow = useRef([]);

  const fetchData = async () => {
    const eateriesData = await getEateries();
    if (eateriesData.exists) {
      let objData = eateriesData.data();
      let arrData = [];
      Object.keys(objData).forEach((eatery) => {
        arrData.push(objData[eatery]);
      });
      setEateries(arrData);
    }
  };

  useEffect(() => {
    fetchData();
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
            logMenuFetch({name: item.slug});
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

      {/* {!isSearching && <FloatingPill navigation={navigation} />} */}
    </>
  );
};

export default EateriesScene;
