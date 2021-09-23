import messaging from '@react-native-firebase/messaging';

export const subscribeMessUpdate = (value) => {
  if (value) {
    messaging().subscribeToTopic('messMenuUpdate');
  } else {
    messaging().unsubscribeFromTopic('messMenuUpdate');
  }
};

export const subscribeLoggedInUser = (value) => {
  if (value) {
    messaging().subscribeToTopic('loggedInUser');
  } else {
    messaging().unsubscribeFromTopic('loggedInUser');
  }
};

export default messaging;
