import {DefaultTheme, DarkTheme} from 'react-native-paper';

import {GRAY, PRIMARY, ACCENT, BACKGROUND} from '../constants/colors';

export const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: GRAY.T3,
    text: GRAY.T10,
    primary: PRIMARY,
    accent: ACCENT,
    notification: ACCENT,
    border: 'transparent',
    card: GRAY.T1,
    surface: GRAY.T4,
    disabled: GRAY.T6,
    active: GRAY.T7,
    placeholder: GRAY.T6,
    helper: GRAY.T8,
    bottomNavigation: GRAY.T1,
    elevated: GRAY.T1,
  },
};

export const dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: BACKGROUND.PRIMARY,
    text: GRAY.T2,
    primary: PRIMARY,
    accent: ACCENT,
    notification: ACCENT,
    border: 'transparent',
    card: GRAY.T9,
    surface: BACKGROUND.SECONDARY,
    disabled: GRAY.T6,
    active: GRAY.T4,
    placeholder: GRAY.T6,
    helper: GRAY.T6,
    bottomNavigation: BACKGROUND.PRIMARY,
    elevated: GRAY.T9,
  },
};

export const amoled = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: GRAY.T10,
    text: GRAY.T2,
    primary: PRIMARY,
    accent: ACCENT,
    notification: ACCENT,
    border: GRAY.T6,
    card: GRAY.T10,
    surface: GRAY.T10,
    disabled: GRAY.T7,
    active: GRAY.T4,
    placeholder: GRAY.T7,
    helper: GRAY.T6,
    bottomNavigation: GRAY.T10,
    elevated: GRAY.T9,
  },
};

export const ROUNDNESS = 16;
