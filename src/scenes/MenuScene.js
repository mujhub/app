import React from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';

import SceneBuilder from '../components/Shared/SceneBuilder';

const MenuScene = () => {
  const {colors} = useTheme();

  return (
    <SceneBuilder>
      <ScrollView>
        <Text style={{color: colors.text}}>Menu</Text>
      </ScrollView>
    </SceneBuilder>
  );
};

export default MenuScene;
