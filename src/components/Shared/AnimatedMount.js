import React, {useRef, useEffect, useState} from 'react';
import {View, Animated} from 'react-native';

const AnimatedMount = ({children, maxHeight}) => {
  const height = useRef(new Animated.Value(0)).current;

  const animateExpandComponent = () => {
    Animated.timing(height, {
      toValue: maxHeight || 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      animateExpandComponent();
    }, 500);
    return () => clearTimeout(delayTimer);
  }, []);

  return <Animated.View style={{height}}>{children}</Animated.View>;
};

export default AnimatedMount;
