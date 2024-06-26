import React, {useContext, useState} from 'react';
import {ScrollView, View, Dimensions} from 'react-native';
import auth from '@react-native-firebase/auth';

import {CustomTheme} from '../contexts/CustomTheme';

import {
  SceneBuilder,
  Type,
  Header,
  ThemedModal,
  ThemeControl,
  PrimaryButton,
} from '../components/Shared/';

// for settings
import RatingAndBugOption from '../components/Shared/RatingAndBugOption';
import UpdateAppAndShareOption from '../components/Shared/UpdateAppAndShareOption';

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
        <Type style={{fontSize: width / 28, fontWeight: 'bold'}}>SETTINGS</Type>
        <View style={{paddingVertical: 15}}>
          <ThemeControl />
          <RatingAndBugOption />
          <UpdateAppAndShareOption />
        </View>
      </ThemedModal>
      <SceneBuilder>
        <Header
          heading={HOME.HEADING}
          navigation={navigation}
          iconNames={['settings-sharp', 'person']}
          iconActions={[
            () => {
              setSettingsModal(true);
            },
            () => {
              navigation.navigate('ProfileScreen');
            },
          ]}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <UpdateChecker navigation={navigation} />
          <SDRBuilder navigation={navigation} />

          <View style={{height: 120, paddingBottom: height / 4}} />
        </ScrollView>
      </SceneBuilder>
    </>
  );
};

export default HomeScene;
