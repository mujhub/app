import {API_URL} from '../constants/urls';
import auth from '@react-native-firebase/auth';
import axios from 'axios';

export const placeOrder = async ({items, shop, block, token}) => {
  const authToken = await auth().currentUser.getIdToken();
  let order = null;
  try {
    const res = await axios({
      url: `${API_URL}/orders/`,
      method: 'post',
      data: token ? {items, shop, block, token} : {items, shop, block},
      headers: {Authorization: `Bearer ${authToken}`},
    });
    console.log(res.data);
    order = res.data;
  } catch (error) {
    console.log(JSON.stringify(error));
  } finally {
    return order;
  }
};

export const getOrderHistory = async () => {
  const authToken = await auth().currentUser.getIdToken();
  const userId = await auth().currentUser.uid;
  console.log(userId, authToken);
  let orders = [];
  try {
    const res = await axios({
      url: `${API_URL}/orders/user/${userId}/`,
      method: 'get',
      headers: {Authorization: `Bearer ${authToken}`},
    });
    console.log(res.data);
    const {data} = res.data;
    orders = data.orders;
  } catch (error) {
    console.log(error);
  } finally {
    return orders;
  }
};
