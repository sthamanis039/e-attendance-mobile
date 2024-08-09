import {ThemeProvider} from '@rneui/themed';
import React, {useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import theme from './src/configs/theme';
import {AppContextProvider} from './src/contexts/appContext';
import checkAndGrantPermission from './src/libs/checkAndGrantPermission';
import i18n from './src/libs/i18n';
import {getFromStorage, setToStorage} from './src/libs/storage';
import Navigations from './src/navigations';

export default function App() {
  useEffect(() => {
    checkAndGrantPermission('INTERNET');
    checkAndGrantPermission('ACCESS_NETWORK_STATE');
    checkAndGrantPermission('ACCESS_WIFI_STATE');
    checkAndGrantPermission('ACCESS_FINE_LOCATION');
  }, []);

  useEffect(() => {
    function getAndSetSettings() {
      getFromStorage('settings').then(settings => {
        if (!settings || !settings?.port || !settings?.portScanningTimeout) {
          setToStorage('settings', {port: 8663, portScanningTimeout: 40});
        }
      });
    }

    getAndSetSettings();
  }, []);

  return (
    <SafeAreaProvider>
      <AppContextProvider>
        <I18nextProvider i18n={i18n} defaultNS={'translations'}>
          <ThemeProvider theme={theme}>
            <Navigations />
          </ThemeProvider>
        </I18nextProvider>
      </AppContextProvider>
    </SafeAreaProvider>
  );
}
