import React, {useContext} from 'react';
import {View, Text} from 'react-native';

import {UserAuth} from '../contexts/UserAuth';

import {Type, PrivateNavigator, SceneBuilder} from '../components/Shared';

const PlaceOrderScene = ({route, navigation}) => {
  const {user} = useContext(UserAuth);

  if (!route.params.data) navigation.goBack();
  return (
    <View>
      <PrivateNavigator user={user} navigation={navigation} />
      <SceneBuilder>
        <Type>{JSON.stringify(user)}</Type>
        <Type>{JSON.stringify(route.params.data)}</Type>
      </SceneBuilder>
    </View>
  );
};

export default PlaceOrderScene;
