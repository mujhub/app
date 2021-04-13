import React, {useEffect, useState, useContext} from 'react';
import {View, Text, RefreshControl, Dimensions} from 'react-native';

import {getOrderHistory} from '../services/firestore';
import {UserAuth} from '../contexts/UserAuth';
import {SceneBuilder, Type} from '../components/Shared';
import {ActivityIndicator} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';

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
        <ActivityIndicator color="grey" size={28} />
      )}
    </SceneBuilder>
  );
};

export default OrderHistoryScene;
