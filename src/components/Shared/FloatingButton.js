import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('screen');

const FloatingButton = ({icon, iconColor, color, onPress, children}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={{
        position: 'absolute',
        flexDirection: 'row',
        bottom: width / 15,
        right: width / 15,
        height: width / 10,
        width: null,
        paddingVertical: width / 15,
        paddingHorizontal: width / 20,
        borderRadius: width / 12,
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {icon && <Icon name={icon} color={iconColor} size={width / 20} />}
      {children}
    </TouchableOpacity>
  );
};

export default FloatingButton;
