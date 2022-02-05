import React, {useState, useCallback, useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import {AppNavigator} from './navigations/';
import {CustomTheme} from './contexts/CustomTheme';
import {UserAuth} from './contexts/UserAuth';

import {subscribeLoggedInUser} from './services/messaging';

import {light, dark, amoled} from './styles/theme';
import {mmkvCurrentTheme} from './utils/storage';

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
