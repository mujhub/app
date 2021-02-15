import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';

import {APP_NAME_CAPS} from '../../constants/strings';
import {Type} from '.';
import {GRAY} from '../../constants/colors';

const {height, width} = Dimensions.get('screen');

const Header = ({navigation, isBack, heading, style}) => {
  const {colors} = useTheme();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.background,
        ...style,
      }}>
      {navigation.canGoBack() && isBack ? (
        <TouchableOpacity onPress={handleBack} activeOpacity={0.75}>
          <Icon
            name="chevron-back"
            size={22}
            style={{margin: 5, color: colors.text}}
          />
        </TouchableOpacity>
      ) : null}

      <Type
        style={{
          fontSize: width / 20,
          color: colors.text,
          margin: 5,
          fontWeight: 'bold',
        }}>
        {heading ? heading : APP_NAME_CAPS}
      </Type>
      <Icon
        name="settings-sharp"
        size={width / 20}
        style={{margin: 5, color: colors.text}}
        onPress={() => {}}
      />
    </View>
  );
};

export default Header;
