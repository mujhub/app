import React from 'react';
import {Dimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {TYPE} from '../../constants/colors';

const {width, height} = Dimensions.get('screen');

const FoodType = ({type}) => {
  const {colors} = useTheme();
  let icon = '';
  let color = null;
  switch (type) {
    case 0:
      icon = 'ellipse';
      color = TYPE.VEG;
      break;
    case 1:
      icon = 'egg';
      color = TYPE.EGG;
      break;
    case 2:
      icon = 'ellipse';
      color = TYPE.NON;
      break;

    default:
      icon = 'ellipse';
      color = TYPE.VEG;
      break;
  }
  // return (
  //   <Icon
  //     name={icon}
  //     size={width / 28}
  //     color={color}
  //     style={{marginHorizontal: 5}}
  //   />
  // );
  return (
    <Icon
      name={'ellipse'}
      size={width / 40}
      color={`${colors.text}aa`}
      style={{marginHorizontal: 10}}
    />
  );
};

export default FoodType;
