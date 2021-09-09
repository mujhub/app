import React from 'react';
import {Switch, View} from 'react-native';
import Type from './Type';
import {PRIMARY, THEME, GRAY} from '../../constants/colors';
import {useTheme} from 'react-native-paper';

const ToggleSwitch = ({value, label, labelColor, onChange}) => {
  const {colors, isDark} = useTheme();
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
      }}>
      <Type style={{color: labelColor}}>{`${label}`}</Type>
      <Switch
        onValueChange={onChange}
        value={value}
        onChange={(e) => {
          e.preventDefault();
        }}
        trackColor={{
          false: isDark ? GRAY.T8 : GRAY.T5,
          true: isDark ? THEME.T8 : THEME.T4,
        }}
        thumbColor={PRIMARY}
      />
    </View>
  );
};

export default ToggleSwitch;
