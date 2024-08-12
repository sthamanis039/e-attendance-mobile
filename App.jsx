import {ThemeProvider} from '@rneui/themed';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import theme from './src/configs/theme';
import {AppContextProvider} from './src/contexts/appContext';
import checkAndGrantPermission from './src/libs/checkAndGrantPermission';
import i18n from './src/libs/i18n';
import {getFromStorage, setToStorage} from './src/libs/storage';
import Navigations from './src/navigations';

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    checkAndGrantPermission('INTERNET');
    checkAndGrantPermission('ACCESS_FINE_LOCATION');
    checkAndGrantPermission('VIBRATE');
    checkAndGrantPermission('RECEIVE_BOOT_COMPLETED');
    checkAndGrantPermission('POST_NOTIFICATIONS');
    checkAndGrantPermission('SCHEDULE_EXACT_ALARM');
    checkAndGrantPermission('USE_EXACT_ALARM');
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
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n} defaultNS={'translations'}>
            <ThemeProvider theme={theme}>
              <Navigations />
            </ThemeProvider>
          </I18nextProvider>
        </QueryClientProvider>
      </AppContextProvider>
    </SafeAreaProvider>
  );
}
