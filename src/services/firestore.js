import firestore from '@react-native-firebase/firestore';

const db = firestore();

export const getHomeComponents = () => {
  return db.collection('app').doc('homeComponents').get();
};

export const getMessMenu = () => {
  return db.collection('mess').doc('menuData').get();
};

export const getEateries = () => {
  return db.collection('eateries').doc('info-data').get();
};

export const getEateryBySlug = (slug) => {
  if (!slug) return;
  return db.collection('eateries').doc(slug).get();
};
