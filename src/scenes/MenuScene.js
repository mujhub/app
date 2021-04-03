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
  Linking,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {CustomTheme} from '../contexts/CustomTheme';
import OutletHero from '../components/Menu/OutletHero';
import OutletHeader from '../components/Menu/OutletHeader';
import MenuList from '../components/Menu/MenuList';
import {InputBox, Type, FloatingButton} from '../components/Shared';
import SearchBox from '../components/Menu/SearchBox';
import {getEateryBySlug} from '../services/firestore';
import {PRIMARY} from '../constants/colors';
import {OUTLETS} from '../constants/strings';
import {logPlaceCall} from '../services/analytics';

const {width, height} = Dimensions.get('screen');

const MenuScene = ({navigation, route}) => {
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

  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [outletInfo, setOutletInfo] = useState(null);
  const [outletMenu, setOutletMenu] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoadingMenu(true);
      let slug = route.params.slug;
      if (!slug) return;
      const res = await getEateryBySlug(slug);
      if (!res.exists) return;
      let data = res.data();
      console.log(JSON.stringify(data));
      let info = data.info;
      if (info) setOutletInfo(info);
      let menu = data.menu;
      if (menu) setOutletMenu(menu);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingMenu(false);
    }
  };

  useEffect(() => {
    if (!route.params) navigation.goBack();
    else if (!route.params.slug) navigation.goBack();

    if (route.params.info) setOutletInfo(route.params.info);
    fetchData();
  }, []);

  if (!route.params) return null;
  if (!route.params.slug) return null;

  return (
    outletInfo && (
      <>
        <ScrollView onScroll={handleOnScroll} stickyHeaderIndices={[1]}>
          <OutletHero
            yOffset={scrollYPosition}
            onParallaxImageScrolled={handleParallaxImageScrolled}
            headingTint={headingTint}
            setHeadingTint={setHeadingTint}
            outletInfo={outletInfo}
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
              outletInfo={outletInfo}
            />
          </View>

          {!isLoadingMenu && outletInfo ? (
            <View style={{minHeight: height}}>
              <MenuList data={outletMenu} navigation={navigation} />
            </View>
          ) : (
            <Type>Loading...</Type>
          )}
          {/* <View style={{height: 500, width}}></View> */}
        </ScrollView>

        <View>
          <FloatingButton
            icon="call"
            iconColor="white"
            color={PRIMARY}
            onPress={() => {
              Linking.canOpenURL('tel:').then((can) => {
                if (can) {
                  logPlaceCall({name: outletInfo.slug});
                  Linking.openURL('tel:7668310023');
                }
              });
            }}>
            <Type style={{marginHorizontal: 8, color: 'white'}}>
              {OUTLETS.CALL}
            </Type>
          </FloatingButton>
        </View>
      </>
    )
  );
};

export default MenuScene;
