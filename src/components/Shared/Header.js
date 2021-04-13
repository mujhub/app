import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-paper';

import {Type} from '.';

import {APP_NAME_CAPS} from '../../constants/strings';
import {GRAY} from '../../constants/colors';

const {height, width} = Dimensions.get('screen');

const Header = ({navigation, isBack, heading, style, iconName, iconAction}) => {
  const {colors} = useTheme();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <View
        style={{
          marginBottom: -20,
          // paddingBottom: ,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: colors.background,
          height: height / 20,
          paddingVertical: 28,
          zIndex: 2,
          ...style,
        }}>
        <View style={{position: 'absolute', width: '100%'}}>
          <Type
            style={{
              fontSize: width / 22,
              textAlign: 'center',
              color: colors.text,
              margin: 8,
              fontWeight: 'bold',
            }}>
            {heading ? heading : APP_NAME_CAPS}
          </Type>
        </View>

        {navigation.canGoBack() && isBack ? (
          <TouchableOpacity onPress={handleBack} activeOpacity={0.75}>
            <Icon
              name="chevron-back"
              size={22}
              style={{margin: 5, color: colors.text}}
            />
          </TouchableOpacity>
        ) : null}

        {iconName && (
          <TouchableOpacity
            activeOpacity={0.75}
            style={{position: 'absolute', right: 0, paddingVertical: 8}}
            onPress={typeof iconAction === 'function' ? iconAction : null}>
            <Icon
              name={iconName}
              size={width / 20}
              style={{margin: 5, color: colors.text}}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default Header;
