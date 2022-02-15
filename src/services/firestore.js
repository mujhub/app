import firestore from '@react-native-firebase/firestore';

const generateOrderId = () =>
  Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;

const db = firestore();

export const checkUpdates = () => {
  return db.collection('app').doc('updateInfo').get();
};

export const getHomeComponents = () => {
  return db.collection('app').doc('homeComponents').get();
};

export const getEateriesComponents = () => {
  return db.collection('app').doc('eateriesComponents').get();
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

export const getSearchResults = (query) => {
  query = query.toString();
  if (query.length < 3) return;
  return db.collection('search').doc(query).get();
};

export const placeOrder = async ({uid, slug, data}) => {
  if (!uid || !slug || !data) return;
  // order status:- 0: placed 1: under process 2: completed 3: delivered 4: cancelled
  let oid = generateOrderId();

  let outlet_data = {
    status: 0,
    uid,
    items: data,
    created_at: firestore.FieldValue.serverTimestamp(),
    updated_at: firestore.FieldValue.serverTimestamp(),
  };
  let user_data = {
    status: 0,
    slug,
    items: data,
    created_at: firestore.FieldValue.serverTimestamp(),
    updated_at: firestore.FieldValue.serverTimestamp(),
  };

  try {
    await db
      .collection('orders')
      .doc(`${slug}`)
      .collection('orders')
      .doc(`${oid}`)
      .set(outlet_data);

    await db
      .collection('users')
      .doc(`${uid}`)
      .collection('orders')
      .doc(`${oid}`)
      .set(user_data);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getOrderHistory = async ({uid}) => {
  let orders = [];

  try {
    const docRefs = db
      .collection('users')
      .doc(`${uid}`)
      .collection('orders')
      .orderBy('created_at', 'desc')
      .limit(5)
      .get();
    (await docRefs).forEach((e) => {
      let order = e.data();
      orders.push({...order, oid: e.id});
    });
  } catch (error) {
    console.log(error);
  } finally {
    return orders;
  }
};
