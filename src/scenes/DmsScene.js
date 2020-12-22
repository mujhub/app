import React from 'react';
import {ScrollView} from 'react-native';

import {SceneBuilder, Type} from '../components/Shared/';

const DmsScene = () => {
  return (
    <SceneBuilder>
      <ScrollView>
        <Type>DMS</Type>
      </ScrollView>
    </SceneBuilder>
  );
};

export default DmsScene;
