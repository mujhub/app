import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Alert,
  StatusBar,
  Platform,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {CustomTheme} from '../contexts/CustomTheme';
import OutletHero from '../components/Menu/OutletHero';
import OutletHeader from '../components/Menu/OutletHeader';
import MenuList from '../components/Menu/MenuList';
import {InputBox} from '../components/Shared';
import SearchBox from '../components/Menu/SearchBox';

const {width, height} = Dimensions.get('screen');

const data = [
  {
    id: 0,
    name: 'Vegetable Biryani',
    type: 0,
    description: 'Leo vel orci porta non pulvinar neque laoreet. ',
    price: 89,
    category: 'Biryani',
  },
  {
    id: 1,
    name: 'Chicken Biryani',
    type: 2,
    description: 'Pellentesque id nibh tortor id aliquet lectus.',
    price: 149,
    category: 'Biryani',
  },
  {
    id: 2,
    name: 'Lamb Biryani',
    type: 2,
    description: 'Pellentesque id nibh tortor id aliquet lectus.',
    price: 169,
    category: 'Biryani',
  },
  {
    id: 3,
    name: 'Egg Roll',
    type: 1,
    price: [25, 35],
    category: 'Roll',
  },
  {
    id: 4,
    name: 'Paneer Roll',
    type: 0,
    price: [35, 45],
    category: 'Roll',
  },
  {
    id: 5,
    name: 'Chimken Roll',
    type: 2,
    price: [45, 75, 125],
    category: 'Roll',
  },
  {
    id: 6,
    name: 'Noodles Roll',
    type: 0,
    price: [25, 35],
    category: 'Roll',
  },
  {
    id: 7,
    name: 'Schezwan Roll',
    type: 2,
    price: 45,
    category: 'Roll',
  },
  {
    id: 8,
    name: 'Egg Cheese Roll',
    type: 1,
    price: 65,
    category: 'Roll',
  },
  {
    id: 9,
    name: 'Malai Kofta',
    type: 0,
    description:
      'Leo vel orci porta non pulvinar neque laoreet. Sed blandit libero volutpat sed. Eu volutpat odio facilisis mauris. Pellentesque id nibh tortor id aliquet lectus.',
    price: 149,
    category: 'MAIN COURSE',
  },
  {
    id: 10,
    name: 'Chole Curry',
    type: 0,
    description:
      'Leo vel orci porta non pulvinar neque laoreet. Sed blandit libero volutpat sed. Eu volutpat odio facilisis mauris. Pellentesque id nibh tortor id aliquet lectus.',
    price: 165,
    category: 'MAIN COURSE',
  },
  {
    id: 11,
    name: 'Murgh Mussallam (4 pcs.)',
    type: 2,
    description:
      'Leo vel orci porta non pulvinar neque laoreet. Sed blandit libero volutpat sed. Eu volutpat odio facilisis mauris. Pellentesque id nibh tortor id aliquet lectus.',
    price: 275,
    category: 'MAIN COURSE',
  },
  {
    id: 12,
    name: 'Palak Paneer',
    type: 0,
    description:
      'Leo vel orci porta non pulvinar neque laoreet. Sed blandit libero volutpat sed. Eu volutpat odio facilisis mauris. Pellentesque id nibh tortor id aliquet lectus.',
    price: 175,
    category: 'MAIN COURSE',
  },
  {
    id: 13,
    name: 'Egg Curry',
    type: 1,
    description:
      'Leo vel orci porta non pulvinar neque laoreet. Sed blandit libero volutpat sed. Eu volutpat odio facilisis mauris. Pellentesque id nibh tortor id aliquet lectus.',
    price: 165,
    category: 'MAIN COURSE',
  },
];

const MenuScene = ({navigation}) => {
  const {colors} = useTheme();
  const {isDarkMode} = useContext(CustomTheme);

  const [scrollYPosition, setScrollYPosition] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [headerColor, setHeaderColor] = useState('transparent');
  const [headingTint, setHeadingTint] = useState(255);

  const handleOnScroll = (event) => {
    if (event.nativeEvent.contentOffset.y < height / 2) {
      setScrollYPosition(event.nativeEvent.contentOffset.y);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleParallaxImageScrolled = (scrolled) => {
    if (scrolled) {
      setHasScrolled(true);
      setHeaderColor(colors.elevated);
      setHeadingTint(isDarkMode ? 255 : 0);
    } else {
      setHasScrolled(false);
      setHeaderColor('transparent');
    }
  };

  return (
    <ScrollView onScroll={handleOnScroll} stickyHeaderIndices={[1]}>
      <OutletHero
        yOffset={scrollYPosition}
        onParallaxImageScrolled={handleParallaxImageScrolled}
        headingTint={headingTint}
        setHeadingTint={setHeadingTint}
      />

      <View
        style={{
          position: 'absolute',
          width,
          backgroundColor: headerColor,
        }}>
        <OutletHeader
          headerColor={headerColor}
          handleBack={handleBack}
          headingTint={headingTint}
          hasScrolled={hasScrolled}
        />
      </View>

      <View style={{minHeight: height}}>
        <MenuList data={data} navigation={navigation} />
      </View>
    </ScrollView>
  );
};

export default MenuScene;
