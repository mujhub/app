import React, {useContext} from 'react';
import {ScrollView} from 'react-native';

import {CustomTheme} from '../contexts/CustomTheme';

import {
  SceneBuilder,
  Type,
  PrimaryButton,
  InputBox,
  Header,
} from '../components/Shared/';
import MessMenuCard from '../components/Home/MessMenuCard';
import {HOME} from '../constants/strings';

const HomeScene = ({navigation}) => {
  const {setTheme} = useContext(CustomTheme);

  return (
    <SceneBuilder>
      <Header
        heading={HOME.HEADING}
        navigation={navigation}
        iconName="settings-sharp"
      />
      <ScrollView>
        <MessMenuCard />
        <PrimaryButton onPress={() => setTheme(1)}>Light</PrimaryButton>
        <PrimaryButton onPress={() => setTheme(2)}>Dark</PrimaryButton>
        <PrimaryButton onPress={() => setTheme(3)}>Amoled</PrimaryButton>
      </ScrollView>
    </SceneBuilder>
  );
};

export default HomeScene;
