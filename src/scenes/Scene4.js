import React from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';

import SceneBuilder from '../components/Shared/SceneBuilder';

const Scene4 = () => {
  const {colors} = useTheme();

  return (
    <SceneBuilder>
      <ScrollView>
        <Text style={{color: colors.text}}>Scene4</Text>
      </ScrollView>
    </SceneBuilder>
  );
};

export default Scene4;
