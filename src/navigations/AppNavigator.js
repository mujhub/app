import React, {useContext} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {light, dark, amoled} from '../styles/theme';
import {CustomTheme} from '../contexts/CustomTheme';

import BottomNavigator from './BottomNavigator';
import {Scene5, Scene6} from '../scenes/';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const {isDarkMode} = useContext(CustomTheme);

  return (
    <NavigationContainer theme={isDarkMode ? dark : light}>
      <StatusBar
        barStyle={DarkTheme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={DarkTheme.dark ? '#000' : '#fff'}
      />
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen
          name="MainScreen"
          component={BottomNavigator}
          options={{headerShown: false, title: 'MUJ Hub'}}
        />
        <Stack.Screen
          name="Scene5"
          component={Scene5}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Scene6"
          component={Scene6}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
