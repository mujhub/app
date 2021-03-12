import React from 'react';
import {ScrollView, FlatList, Text, View} from 'react-native';

import {
  SceneBuilder,
  Type,
  Header,
  ListItem,
  ItemSeparator,
  ListFooter,
} from '../components/Shared';
import {VIBRANTS} from '../constants/colors';
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {FOOD, OUTLETS} from '../constants/strings';

const dummyEateries = [
  {
    id: '1',
    name: 'Indie Vibes',
    time: '11am - 11pm',
    desc: 'All the Delhi Specials',
    tint: VIBRANTS.BLUE,
    featured: true,
  },
  {
    id: '2',
    name: 'The Foodies Bar',
    time: '11am - 2am',
    desc: 'All the Delhi Specials',
    tint: VIBRANTS.GREEN1,
    featured: true,
  },
  {
    id: '3',
    name: 'All in One Mart',
    time: '11am - 11pm',
    desc: 'All the Delhi Specials',
    tint: VIBRANTS.GREEN2,
    featured: 0,
  },
  {
    id: '4',
    name: 'The Perfect Mall',
    time: '11am - 11pm',
    desc: 'All the Delhi Specials',
    tint: VIBRANTS.PURPLE1,
    featured: false,
  },
  {
    id: '5',
    name: 'The Facebook',
    time: '11am - 11pm',
    desc: 'All the Delhi Specials',
    tint: VIBRANTS.PURPLE2,
    featured: false,
  },
  {
    id: '6',
    name: 'Dev Sweets',
    time: '11am - 11pm',
    desc: 'All the Delhi Specials',
    tint: VIBRANTS.RED,
    featured: false,
  },
  {
    id: '7',
    name: 'Dev Sweets',
    time: '11am - 11pm',
    desc: 'All the Delhi Specials',
    tint: VIBRANTS.YELLOW,
    featured: false,
  },
  {
    id: '8',
    name: 'Dev Sweets',
    time: '11am - 11pm',
    desc: 'All the Delhi Specials',
    tint: VIBRANTS.YELLOW,
    featured: false,
  },
  {
    id: '9',
    name: 'Dev Sweets',
    time: '11am - 11pm',
    desc: 'All the Delhi Specials',
    tint: VIBRANTS.YELLOW,
    featured: false,
  },
  {
    id: '10',
    name: 'Dev Sweets',
    time: '11am - 11pm',
    desc: 'All the Delhi Specials',
    tint: VIBRANTS.YELLOW,
    featured: false,
  },
  {
    id: '11',
    name: 'Dev Sweets',
    time: '11am - 11pm',
    desc: 'All the Delhi Specials',
    tint: VIBRANTS.YELLOW,
    featured: false,
  },
];

const EateriesScene = ({navigation}) => {
  const renderer = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => {
        navigation.navigate('MenuScene');
      }}>
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
    <SceneBuilder>
      <Header
        heading={FOOD.HEADING}
        navigation={navigation}
        iconName="settings-sharp"
      />
      <FlatList
        ListHeaderComponent={eateriesHeader}
        ListFooterComponent={eateriesFooter}
        data={dummyEateries}
        renderItem={renderer}
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
      />
    </SceneBuilder>
  );
};

export default EateriesScene;
