import React, {useState, useCallback, useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {AppNavigator} from './navigations/';
import {CustomTheme} from './contexts/CustomTheme';

import {light, dark, amoled} from './styles/theme';
import {mmkvCurrentTheme} from './utils/storage';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currTheme, setCurrTheme] = useState(light);

  const setTheme = useCallback(
    (theme) => {
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

  return (
    <CustomTheme.Provider value={{setTheme, currTheme, isDarkMode}}>
      <PaperProvider theme={currTheme}>
        <AppNavigator />
      </PaperProvider>
    </CustomTheme.Provider>
  );
};

export default App;
