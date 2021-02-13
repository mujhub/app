import React from 'react';
import {Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {useTheme} from 'react-native-paper';

import {HomeScene, DmsScene, MenuScene} from '../scenes/';
import {PRIMARY, GRAY} from '../constants/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const {width, height} = Dimensions.get('window');

const HomeStackScreen = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScene}
        options={{headerShown: false}}
        initialParams={{load: true}}
      />
    </Stack.Navigator>
  );
};

const BottomNavigator = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'fast-food' : 'fast-food-outline';
          } else if (route.name === 'Dms') {
            iconName = focused ? 'business' : 'business-outline';
          }
          return (
            <Icon
              name={iconName}
              size={focused ? size + 1 : size - 1}
              color={color}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.active,
        inactiveTintColor: colors.disabled,
        keyboardHidesTabBar: true,
        showLabel: false,
        style: {
          height: height / 12,
          borderTopWidth: 0,
          backgroundColor: colors.bottomNavigation,
        },
      }}>
      <Tab.Screen name="Menu" component={MenuScene} />
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Dms" component={DmsScene} />
    </Tab.Navigator>
  );
};
export default BottomNavigator;
