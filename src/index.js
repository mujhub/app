import React, {useState, useCallback} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {AppNavigator} from './navigations/';
import {CustomTheme} from './contexts/CustomTheme';

import {light, dark, amoled} from './styles/theme';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const switchTheme = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  return (
    <CustomTheme.Provider value={{switchTheme, isDarkMode}}>
      <PaperProvider theme={isDarkMode ? dark : light}>
        <AppNavigator />
      </PaperProvider>
    </CustomTheme.Provider>
  );
};

export default App;
