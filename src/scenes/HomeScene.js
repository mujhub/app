import React from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native';
import SceneBuilder from '../components/Shared/SceneBuilder';

const HomeScene = () => {
  return (
    <SceneBuilder>
      <ScrollView>
        <Text>Home</Text>
      </ScrollView>
    </SceneBuilder>
  );
};

export default HomeScene;
