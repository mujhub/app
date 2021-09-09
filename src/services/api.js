import {API_URL} from '../constants/urls';
import auth from '@react-native-firebase/auth';
import axios from 'axios';

export const placeOrder = async ({items, shop}) => {
  const token = await auth().currentUser.getIdToken();
  let order = null;
  try {
    const res = await axios({
      url: `${API_URL}/orders/`,
      method: 'post',
      data: {items, shop},
      headers: {Authorization: `Bearer ${token}`},
    });
    console.log(res.data);
    order = res.data;
  } catch (error) {
    console.log(JSON.stringify(error));
  } finally {
    return order;
  }
};
