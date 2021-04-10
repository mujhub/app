import React, {useContext, useRef} from 'react';
import {StatusBar, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import analytics from '@react-native-firebase/analytics';
import Icon from 'react-native-vector-icons/Ionicons';

import {light, dark, amoled} from '../styles/theme';
import {CustomTheme} from '../contexts/CustomTheme';

import {UserAuth} from '../contexts/UserAuth';

import BottomNavigator from './BottomNavigator';
import {
  LoginScene,
  MenuScene,
  SearchMenuScene,
  QrReaderScene,
} from '../scenes/';

const Stack = createStackNavigator();
const {width, height} = Dimensions.get('screen');

const AppNavigator = () => {
  const {isDarkMode} = useContext(CustomTheme);
  const {user} = useContext(UserAuth);
  const navigationRef = useRef();
  const routeNameRef = useRef();

  return (
    <NavigationContainer
      theme={isDarkMode ? dark : light}
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <Stack.Navigator
        initialRouteName={user ? 'MainScreen' : 'LoginScreen'}
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          gestureResponseDistance: {horizontal: width / 2},
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScene}
          options={{headerShown: false, title: 'MUJ HUB'}}
        />
        <Stack.Screen
          name="MainScreen"
          component={BottomNavigator}
          options={{headerShown: false, title: 'MUJ HUB'}}
        />
        <Stack.Screen
          name="MenuScene"
          component={MenuScene}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchMenuScene"
          component={SearchMenuScene}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QrReaderScene"
          component={QrReaderScene}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
