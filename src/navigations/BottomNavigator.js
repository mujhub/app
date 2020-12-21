import React from 'react';
import {Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {HomeScene, DmsScene, MenuScene, Scene4} from '../scenes/';
import {COLORS, STRINGS} from '../constants/';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const {width, height} = Dimensions.get('window');

const HomeStackScreen = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScene}
        options={{title: STRINGS.APP_NAME, headerShown: false}}
        initialParams={{load: true}}
      />
    </Stack.Navigator>
  );
};

const BottomNavigator = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-sharp';
          } else if (route.name === 'Menu') {
            iconName = 'restaurant';
          } else if (route.name === 'Dms') {
            iconName = 'document';
          } else if (route.name === 'Scene4') {
            iconName = 'apps';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: COLORS.PRIMARY,
        inactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
        showLabel: false,
        style: {
          // backgroundColor: COLORS.GRAY.T1,
          height: height / 12,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Menu" component={MenuScene} />
      <Tab.Screen name="Dms" component={DmsScene} />
      <Tab.Screen name="Scene4" component={Scene4} />
    </Tab.Navigator>
  );
};
export default BottomNavigator;
