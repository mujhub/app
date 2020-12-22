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
  const {switchTheme} = useContext(CustomTheme);

  return (
    <SceneBuilder>
      <ScrollView>
        <Type>Home</Type>
        <PrimaryButton onPress={switchTheme}>Switch</PrimaryButton>
        <InputBox value={'Hi mom'} />
      </ScrollView>
    </SceneBuilder>
  );
};

export default HomeScene;
