import {Linking} from 'react-native';

export const cardBehaviorHandler = ({behavior, navigation}) => {
  if (behavior.link) {
    Linking.canOpenURL(behavior.link).then((fulfilled) => {
      if (fulfilled) Linking.openURL(behavior.link);
    });
    return;
  }
  if (behavior.navigate) {
    try {
      if (behavior.navigate.to) {
        navigation.navigate(behavior.navigate.to, {
          ...behavior.navigate.params,
        });
      }
    } catch (error) {
      console.log(error);
    }
    return;
  }
};
