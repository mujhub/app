import React, {useState, useEffect} from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';

import {ThemedModal, Type, Card} from '../Shared';

import {APP_VERSION} from '../../constants/info';

import {checkUpdates} from '../../services/firestore';
import {cardBehaviorHandler} from '../../utils/SDRHandlers';

const UpdateChecker = ({navigation}) => {
  const {colors} = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isBelowMinimum, setIsBelowMinimum] = useState(false);
  const [data, setData] = useState({});

  const check = async () => {
    const res = await checkUpdates();
    if (!res.exists) return;
    const data = res.data();
    setData(data);
    if (Number(APP_VERSION) < Number(data.latestVersion)) {
      setIsAvailable(true);
      setIsVisible(true);
    }
    if (Number(APP_VERSION) < Number(data.minimumVersion))
      setIsBelowMinimum(true);
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <>
      {isBelowMinimum && (
        <ThemedModal visible={isVisible} setVisible={() => {}}>
          <View style={{marginBottom: 40}}>
            <Type style={{fontSize: 18, fontWeight: 'bold'}}>
              {data.heading}
            </Type>
            <Type>{data.hardMessage}</Type>
          </View>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => {
              cardBehaviorHandler({navigation, behavior: data.behavior});
            }}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              paddingHorizontal: 20,
              paddingVertical: 5,
              marginBottom: 15,
            }}>
            <Type
              style={{
                fontWeight: 'bold',
                color: colors.primary,
                textAlign: 'right',
              }}>
              UPDATE
            </Type>
          </TouchableOpacity>
        </ThemedModal>
      )}
      {isAvailable && (
        <View style={{paddingBottom: 20}}>
          <Card>
            <View
              style={{marginTop: 15, marginBottom: 30, marginHorizontal: 10}}>
              <Type style={{fontSize: 20, fontWeight: 'bold'}}>
                {data.heading}
              </Type>
              <Type>{data.softMessage}</Type>
            </View>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => {
                cardBehaviorHandler({navigation, behavior: data.behavior});
              }}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                paddingHorizontal: 20,
                paddingVertical: 5,
                marginBottom: 15,
              }}>
              <Type
                style={{
                  fontWeight: 'bold',
                  color: colors.primary,
                  textAlign: 'right',
                }}>
                UPDATE
              </Type>
            </TouchableOpacity>
          </Card>
        </View>
      )}
    </>
  );
};

export default UpdateChecker;
