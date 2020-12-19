import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import BottomNavigator from './BottomNavigator';

import {Scene5, Scene6} from '../scenes/';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={'#000'} />
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen
          name="MainScreen"
          component={BottomNavigator}
          options={{headerShown: false}}
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
