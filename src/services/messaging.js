import messaging from '@react-native-firebase/messaging';

export const subscribeMessUpdate = (value) => {
  if (value) {
    messaging().subscribeToTopic('messMenuUpdate');
    console.log('subscribed');
  } else {
    messaging().unsubscribeFromTopic('messMenuUpdate');
    console.log('unsubscribed');
  }
};
