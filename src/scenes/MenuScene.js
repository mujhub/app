import React from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native';
import SceneBuilder from '../components/Shared/SceneBuilder';

const MenuScene = () => {
  return (
    <SceneBuilder>
      <ScrollView>
        <Text>Menu</Text>
      </ScrollView>
    </SceneBuilder>
  );
};

export default MenuScene;
