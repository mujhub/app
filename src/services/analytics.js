import analytics from '@react-native-firebase/analytics';

const logger = analytics();

export const logMenuFetch = async ({name}) => {
  await logger.logEvent('menu_fetched', {name});
};

export const logPlaceCall = async ({name}) => {
  await logger.logEvent('call_placed', {name});
};

export const logPayment = async ({name}) => {
  await logger.logEvent('payment_made', {name});
};

export const logMessMenu = async ({meal}) => {
  await logger.logEvent('mess_menu_viewed', {meal});
};

export const logUniversalSearch = async ({query}) => {
  await logger.logEvent('universal_searched', {query});
};

export const logDMSLogin = async () => {
  await logger.logEvent('dms_logged_in');
};

export const logCardTap = async ({title}) => {
  await logger.logEvent('card_tap', {title});
};
