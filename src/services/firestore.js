import firestore from '@react-native-firebase/firestore';

const db = firestore();

export const getMessMenu = () => {
  return db.collection('mess').doc('menuData').get();
};
