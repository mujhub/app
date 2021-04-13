import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import {UserAuth} from '../contexts/UserAuth';
import {getOrderHistory} from '../services/firestore';

import {SceneBuilder, Type} from '../components/Shared';
import {PRIMARY} from '../constants/colors';

const {width, height} = Dimensions.get('screen');

const OrderHistoryScene = () => {
  const {user} = useContext(UserAuth);

  const [isLoading, setIsLoading] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const historyData = await getOrderHistory({uid: user.uid});
      setOrderHistory(historyData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SceneBuilder>
      {!isLoading ? (
        <FlatList
          style={{minHeight: height}}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
          }
          keyExtractor={(item) => item.oid}
          data={orderHistory}
          renderItem={({item}) => (
            <View key={item.oid}>
              <Type>{JSON.stringify(item)}</Type>
            </View>
          )}
        />
      ) : (
        <ActivityIndicator color={PRIMARY} size={28} />
      )}
    </SceneBuilder>
  );
};

export default OrderHistoryScene;
