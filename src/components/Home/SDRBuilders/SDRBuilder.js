import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import {Type} from '../../Shared';
import SDRCards from './SDRCards';
import SDRModals from './SDRModals';

import {getHomeComponents} from '../../../services/firestore';

const SDRBuilder = ({navigation}) => {
  const getData = async () => {
    try {
      let res = await getHomeComponents();
      if (!res.exists) return;
      if (res.data()) {
        setData(res.data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [data, setData] = useState(null);
  const [cards, setCards] = useState([]);
  const [modals, setModals] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      setModals(data.modals);
      setCards(data.cards);
    }
  }, [data]);

  return (
    <View>{cards && <SDRCards cards={cards} navigation={navigation} />}</View>
  );
};

export default SDRBuilder;
