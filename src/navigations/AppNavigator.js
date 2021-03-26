import React, {useContext} from 'react';
import {StatusBar, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {light, dark, amoled} from '../styles/theme';
import {CustomTheme} from '../contexts/CustomTheme';

import BottomNavigator from './BottomNavigator';
import {MenuScene, SearchMenuScene, QrReaderScene} from '../scenes/';

const Stack = createStackNavigator();
const {width, height} = Dimensions.get('screen');

const AppNavigator = () => {
  const {isDarkMode} = useContext(CustomTheme);

  return (
    <NavigationContainer theme={isDarkMode ? dark : light}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <Stack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          gestureResponseDistance: {horizontal: width / 3},
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen
          name="MainScreen"
          component={BottomNavigator}
          options={{headerShown: false, title: 'MUJ Hub'}}
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
