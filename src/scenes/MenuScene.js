import React from 'react';
import {ScrollView} from 'react-native';

import {SceneBuilder, Type} from '../components/Shared/';

const MenuScene = () => {
  return (
    <SceneBuilder>
      <ScrollView>
        <Type>Menu</Type>
      </ScrollView>
    </SceneBuilder>
  );
};

export default MenuScene;
