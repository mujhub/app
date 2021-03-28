import React, {useContext} from 'react';
import {ScrollView, View} from 'react-native';

import {CustomTheme} from '../contexts/CustomTheme';

import {
  SceneBuilder,
  Type,
  PrimaryButton,
  InputBox,
  Header,
} from '../components/Shared/';
import MessMenuCard from '../components/Home/MessMenuCard';
import UpdateChecker from '../components/SDR/UpdateChecker';
import SDRBuilder from '../components/Home/SDRBuilders/SDRBuilder';

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <UpdateChecker navigation={navigation} />
        <SDRBuilder navigation={navigation} />
        <PrimaryButton onPress={() => setTheme(1)}>Light</PrimaryButton>
        <PrimaryButton onPress={() => setTheme(2)}>Dark</PrimaryButton>
        <PrimaryButton onPress={() => setTheme(3)}>Amoled</PrimaryButton>
        <View style={{height: 120}} />
      </ScrollView>
    </SceneBuilder>
  );
};

export default HomeScene;
