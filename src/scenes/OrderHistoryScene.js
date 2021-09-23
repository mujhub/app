import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import {UserAuth} from '../contexts/UserAuth';
import {getOrderHistory} from '../services/api';

import {
  SceneBuilder,
  Type,
  Card,
  Header,
  ItemSeparator,
} from '../components/Shared';
import {PRIMARY} from '../constants/colors';
import {useTheme} from 'react-native-paper';
import OrderHistoryCard from '../components/Order/OrderHistoryCard';

const {width, height} = Dimensions.get('screen');

const OrderHistoryScene = ({navigation}) => {
  const {user} = useContext(UserAuth);

  const [isLoading, setIsLoading] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const historyData = await getOrderHistory();
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
      <Header
        heading="HISTORY"
        navigation={navigation}
        iconNames={['refresh']}
        iconActions={[fetchData]}
      />
      {!isLoading ? (
        <FlatList
          style={{minHeight: height}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
          }
          extraData={true}
          keyExtractor={(item) => item.oid}
          data={orderHistory}
          renderItem={({item: order}) => <OrderHistoryCard order={order} />}
          ListFooterComponent={<View style={{height: height / 5}} />}
        />
      ) : (
        <ActivityIndicator color={PRIMARY} size={28} />
      )}
    </SceneBuilder>
  );
};

export default OrderHistoryScene;
