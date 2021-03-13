import firestore from '@react-native-firebase/firestore';

const db = firestore();

export const getHomeComponents = () => {
  return db.collection('app').doc('homeComponents').get();
};

export const getMessMenu = () => {
  return db.collection('mess').doc('menuData').get();
};
