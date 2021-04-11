import React, {useEffect} from 'react';
import {View, Text, Alert} from 'react-native';

const PrivateNavigator = ({user, navigation}) => {
  useEffect(() => {
    if (!user) navigation.goBack();
  }, []);
  return <View />;
};

export default PrivateNavigator;
