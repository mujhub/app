import React from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native';
import SceneBuilder from '../components/Shared/SceneBuilder';

const DmsScene = () => {
  return (
    <SceneBuilder>
      <ScrollView>
        <Text>DMS</Text>
      </ScrollView>
    </SceneBuilder>
  );
};

export default DmsScene;
