import {DefaultTheme, DarkTheme} from 'react-native-paper';

export const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    text: 'black',
    primary: 'red',
    accent: '#ff9100',
    notification: '',
    border: 'red',
    card: 'red',
    surface: 'red',
    disabled: 'red',
    placeholder: 'red',
  },
};

export const dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: 'black',
    text: 'white',
    primary: 'green',
    accent: '#ff9100',
    notification: 'green',
    border: 'green',
    card: 'green',
    surface: 'green',
    disabled: 'green',
    placeholder: 'green',
  },
};

export const amoled = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: 'black',
    text: 'white',
    primary: '',
    accent: '#ff9100',
    notification: '',
    border: '',
    card: '',
    surface: '',
    disabled: '',
    placeholder: '',
  },
};
