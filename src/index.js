import React, {useState, useCallback, useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

import {AppNavigator} from './navigations/';
import {CustomTheme} from './contexts/CustomTheme';
import {UserAuth} from './contexts/UserAuth';

import {subscribeLoggedInUser} from './services/messaging';

import {light, dark, amoled} from './styles/theme';
import {mmkvClearAll, mmkvCurrentTheme} from './utils/storage';
import {Alert} from 'react-native';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currTheme, setCurrTheme] = useState(dark);
  const [themeValue, setThemeValue] = useState(2);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const setTheme = useCallback(
    (theme) => {
      setThemeValue(theme);
      switch (theme) {
        case 1:
          setCurrTheme(light);
          setIsDarkMode(false);
          mmkvCurrentTheme(theme);
          break;
        case 2:
          setCurrTheme(dark);
          setIsDarkMode(true);
          mmkvCurrentTheme(theme);
          break;
        case 3:
          setCurrTheme(amoled);
          setIsDarkMode(true);
          mmkvCurrentTheme(theme);
          break;

        default:
          setCurrTheme(light);
          break;
      }
    },
    [currTheme],
  );

  const getTheme = async () => {
    try {
      const theme = await mmkvCurrentTheme();
      if (theme) {
        setTheme(theme);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTheme();
  }, []);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
    if (user) {
      subscribeLoggedInUser(true);
      console.log('user subscribed');
    } else {
      subscribeLoggedInUser(false);
      console.log('user unsubscribed');
    }
  };

  setJSExceptionHandler((error, isFatal) => {
    console.log(
      ` ===================== MUJHUB Exception Handler (JS Bridge) ===================== \n${error}`,
      `isFatal: ${isFatal}`,
    );
    mmkvClearAll();
    console.log(` =========== Cleared local storage ========== `);
    Alert.alert(`There was an error`, `Please restart the app.`);
  }, true);

  setNativeExceptionHandler((error) => {
    console.log(
      ` ===================== MUJHUB Exception Handler (Native Module) ===================== \n${error}`,
    );
    mmkvClearAll();
    console.log(` =========== Cleared local storage ========== `);
  }, true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
    return unsubscribe;
  }, []);

  if (initializing) return null;
  return (
    <CustomTheme.Provider value={{setTheme, currTheme, themeValue, isDarkMode}}>
      <UserAuth.Provider value={{user, setUser}}>
        <PaperProvider theme={currTheme}>
          <AppNavigator />
        </PaperProvider>
      </UserAuth.Provider>
    </CustomTheme.Provider>
  );
};

export default App;
