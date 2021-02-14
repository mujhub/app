import React, {useContext} from 'react';
import {ScrollView} from 'react-native';

import {CustomTheme} from '../contexts/CustomTheme';

import {
  SceneBuilder,
  Type,
  PrimaryButton,
  InputBox,
} from '../components/Shared/';

const HomeScene = () => {
  const {setTheme} = useContext(CustomTheme);

  return (
    <SceneBuilder>
      <ScrollView>
        <Type>Home</Type>
        <PrimaryButton onPress={() => setTheme(1)}>Light</PrimaryButton>
        <PrimaryButton onPress={() => setTheme(2)}>Dark</PrimaryButton>
        <PrimaryButton onPress={() => setTheme(3)}>Amoled</PrimaryButton>
      </ScrollView>
    </SceneBuilder>
  );
};

export default HomeScene;
