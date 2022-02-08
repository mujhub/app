import {BUNDLE_IDENTIFIER} from './info';

export const APP_NAME = 'MUJ HUB';
export const APP_NAME_CAPS = 'MUJ HUB';
export const SLUG_IDENTIFIER = '&mhs=';

export const FOOD = {
  HEADING: 'FOOD',
};

export const HOME = {
  HEADING: 'MUJ HUB',
};

export const ACADEMICS = {
  HEADING: 'Academics',
};

export const OUTLETS = {
  HEADING: 'Eateries',
  OPEN: 'Open Now',
  CLOSE: 'Closed',
  SEARCH_BOX_PLACEHOLDER: 'Search Items across eateries',
  SEARCH_PRE_MIN_CHARS: 'Keep typing... (min 3 chars)',
  SEARCH_EMPTY_RESULT: 'No items found.',
  SCANNER_TEXT: 'SCAN MENU QR',
  PAYMENT: 'PAY',
  CALL: 'CALL OUTLET',
  NO_CONTACT: 'No contact details found.',
  NO_PAYMENT: 'No payment details found.',
  NO_UPI: 'No UPI details found.',
};

export const ORDER = {
  HEADING: 'ORDER',
};

export const DMS = {
  USERNAME: 'Registration Number',
  PASSWORD: 'Password',
  CAPTCHA: 'Captcha',
  ACTION: 'Login',
  LOADING: 'Loading',
  RELOAD: 'Refresh',
  LOGIN_FOOTER:
    'All your account details remain secured as they are directly sent to the official DMS.',
  NULL_USERNAME: 'Registration number can not be empty',
  NULL_PASSWORD: 'Password can not be empty',
  NULL_CAPTCHA: 'Captcha can not be empty',
  GREET: 'Welcome',
  FOOTER:
    "We're constantly improving the DMS integration. Make sure you keep the app updated!",
  SECURE_MESSAGE:
    'Your account details are encrypted and saved securely on your device.',
  CLEAR_SESSION_BUTTON: 'Forget login credentials',
  CLEAR_SESSION:
    'This will will delete the session and the account details that are saved on your device.',
};

export const MESS = {
  HEADING: 'Mess Menu',
  NULL_MENU: 'Not yet updated.',
  EXPAND_CARD: 'VIEW ALL',
  CONTRACT_CARD: 'CLOSE',
  NOTIFICATION_SUBSCRIPTION: 'Subscribe to update notifications',
};

export const ATTENDANCE = {
  HEADING: 'Attendance Summary',
  BELOW_THRESHOLD_SINGULAR: 'Attend the next class to get back on track.',
  BELOW_THRESHOLD: 'Attend ${v} more classes to get back on track.',
  ABOVE_THRESHOLD_SINGULAR: 'You may miss the next class.',
  ABOVE_THRESHOLD: 'You may miss the next ${v} classes.',
  EQUAL_THRESHOLD: "Just on track. Don't miss the next class.",
};

export const SCAN = {
  HEADING: 'SCAN ANY MUJ HUB QR CODE',
  QR_HEADER: 'Lorem ipsum is dummy text used in graphic designs.',
  QR_FOOTER: 'Lorem ipsum is dummy text used in graphic designs.',
};

export const CART = {
  LEAVE_ORDER: {
    HEADING: 'Are you sure?',
    BODY: 'Your cart has items! Are you sure you want to clear your cart?',
    CANCEL: 'No, stay.',
    OK: 'Yes, go back.',
  },
  ORDER_SUCCESS: {
    HEADING: 'Success',
    BODY: 'Order Placed!',
    ACTION: 'Ok',
  },
  ORDER_FAILURE: {
    HEADING: 'Failure',
    BODY: 'Oops, order could not be placed. Try again later.',
    ACTION: 'Ok',
  },
  INVOICE: {
    TOTAL_LABEL: 'Total Amount:',
    PAYABLE_LABEL: 'Order Total',
    ADDITIONAL: 'Block Number: ',
    ACTION: 'PLACE ORDER',
    NOT_ACCEPTING: 'The restaurant is not accepting orders at the moment.',
  },
};

export const APP = {
  SUPPORT_EMAIL: {
    SUBJECT: 'Bug%20Report',
    BODY:
      'Brief Description: \n\nSteps to reproduce it: \n\nSystem Information:\n',
  },
  SHARE_APP: {
    TITTLE: 'Wow, did you see that?',
    MESSAGE: `Check out MUJ Hub app on Play Store \nhttps://play.google.com/store/apps/details?id=${BUNDLE_IDENTIFIER}`,
  },
};
