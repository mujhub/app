import React, {useContext, useState} from 'react';
import {ScrollView, View, Dimensions} from 'react-native';

import {CustomTheme} from '../contexts/CustomTheme';

import {
  SceneBuilder,
  Type,
  PrimaryButton,
  InputBox,
  Header,
  ThemedModal,
  ThemeControl,
} from '../components/Shared/';
import MessMenuCard from '../components/Home/MessMenuCard';
import UpdateChecker from '../components/SDR/UpdateChecker';
import SDRBuilder from '../components/Home/SDRBuilders/SDRBuilder';

import {HOME} from '../constants/strings';

const {width, height} = Dimensions.get('screen');

const HomeScene = ({navigation}) => {
  const {setTheme} = useContext(CustomTheme);
  const [settingsModal, setSettingsModal] = useState(false);

  return (
    <>
      <ThemedModal visible={settingsModal} setVisible={setSettingsModal}>
        <Type style={{fontSize: width / 20}}>Settings</Type>
        <View style={{paddingVertical: 15}}>
          <ThemeControl />
        </View>
      </ThemedModal>
      <SceneBuilder>
        <Header
          heading={HOME.HEADING}
          navigation={navigation}
          iconName="settings-sharp"
          iconAction={() => {
            setSettingsModal(true);
          }}
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
    </>
  );
};

export default HomeScene;
