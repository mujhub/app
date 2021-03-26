import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {useTheme} from 'react-native-paper';

import {CustomTheme} from '../../contexts/CustomTheme';

import {ROUNDNESS} from '../../styles/theme';
import {THEME, PRIMARY, GRAY} from '../../constants/colors';
import {ItemSeparator} from '.';
import Type from './Type';

const {width, height} = Dimensions.get('screen');

const ThemeControl = () => {
  const {colors} = useTheme();
  const {setTheme, themeValue} = useContext(CustomTheme);
  return (
    <>
      <ItemSeparator />
      <Type style={{color: colors.disabled, margin: 5}}>Change Theme</Type>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => {
            setTheme(1);
          }}
          style={{
            height: height / 20,
            width: '33%',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: ROUNDNESS / 2,
            borderBottomLeftRadius: ROUNDNESS / 2,
            backgroundColor: themeValue === 1 ? GRAY.T5 : GRAY.T7,
          }}>
          <Text style={{color: themeValue === 1 ? GRAY.T8 : GRAY.T2}}>
            LIGHT
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTheme(2);
          }}
          style={{
            height: height / 20,
            width: '33%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: themeValue === 2 ? GRAY.T5 : GRAY.T7,
          }}>
          <Text style={{color: themeValue === 2 ? GRAY.T8 : GRAY.T2}}>
            DARK
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTheme(3);
          }}
          style={{
            height: height / 20,
            width: '33%',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopRightRadius: ROUNDNESS / 2,
            borderBottomRightRadius: ROUNDNESS / 2,
            backgroundColor: themeValue === 3 ? GRAY.T5 : GRAY.T7,
          }}>
          <Text style={{color: themeValue === 3 ? GRAY.T8 : GRAY.T2}}>
            AMOLED
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ThemeControl;
