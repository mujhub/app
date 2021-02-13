import React, {useState, useCallback} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {AppNavigator} from './navigations/';
import {CustomTheme} from './contexts/CustomTheme';

import {light, dark, amoled} from './styles/theme';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currTheme, setCurrTheme] = useState(light);

  const setTheme = useCallback(
    (theme) => {
      switch (theme) {
        case 0:
          setCurrTheme(light);
          setIsDarkMode(false);
          break;
        case 1:
          setCurrTheme(dark);
          setIsDarkMode(true);
          break;
        case 2:
          setCurrTheme(amoled);
          setIsDarkMode(true);
          break;

        default:
          setCurrTheme(light);
          break;
      }
    },
    [currTheme],
  );

  return (
    <CustomTheme.Provider value={{setTheme, currTheme, isDarkMode}}>
      <PaperProvider theme={currTheme}>
        <AppNavigator />
      </PaperProvider>
    </CustomTheme.Provider>
  );
};

export default App;
