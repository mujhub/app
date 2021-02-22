import React from 'react';
import {Text} from 'react-native';
import {useTheme} from 'react-native-paper';

const Type = (props) => {
  const {colors} = useTheme();
  return (
    <Text {...props} style={{color: colors.text, ...props.style}}>
      {props.children}
    </Text>
  );
};

export default Type;
