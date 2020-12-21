import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useTheme} from 'react-native-paper';

import SceneBuilder from '../components/Shared/SceneBuilder';
import {CustomTheme} from '../contexts/CustomTheme';

const HomeScene = () => {
  const {switchTheme} = useContext(CustomTheme);
  const {colors} = useTheme();

  return (
    <SceneBuilder>
      <ScrollView>
        <Text style={{color: colors.text}}>Home</Text>
        <Button
          onPress={() => {
            switchTheme();
          }}>
          Switch
        </Button>
        <TextInput
          value={'Random'}
          placeholder={'Placeholder'}
          theme={{
            colors,
          }}
        />
      </ScrollView>
    </SceneBuilder>
  );
};

export default HomeScene;
