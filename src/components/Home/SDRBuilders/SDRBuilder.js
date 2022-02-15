import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Dimensions} from 'react-native';

import {Type} from '../../Shared';
import SDRCards from './SDRCards';
import SDRModals from './SDRModals';

import {getHomeComponents} from '../../../services/firestore';
import {mmkvHomeList} from '../../../utils/storage';
import {useTheme} from 'react-native-paper';

const SDRBuilder = ({navigation}) => {
  const {width, height} = Dimensions.get('screen');
  const [isSyncing, setIsSyncing] = useState(false);
  const {colors} = useTheme();

  const fetchData = async () => {
    let fetched = false;
    try {
      setIsSyncing(true);
      const cachedHome = mmkvHomeList().then((data) => {
        if (!fetched && data.status) {
          if (typeof data.value === 'object' && data.value !== null) {
            setData(data.value);
          }
        }
      });
      const homeComponents = await getHomeComponents();
      if (homeComponents.exists) {
        fetched = true;
        const remoteData = homeComponents.data();
        setData(remoteData);
        mmkvHomeList(remoteData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSyncing(false);
    }
  };

  const [data, setData] = useState(null);
  const [cards, setCards] = useState([]);
  const [modals, setModals] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setModals(data.modals);
      setCards(data.cards);
    }
  }, [data]);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          marginBottom: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isSyncing && <ActivityIndicator color={colors.disabled} />}
      </View>
      {cards && <SDRCards cards={cards} navigation={navigation} />}
    </View>
  );
};

export default SDRBuilder;
