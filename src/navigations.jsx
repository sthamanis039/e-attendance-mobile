import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '@rneui/themed';
import {useMutation} from '@tanstack/react-query';
import React, {useCallback, useEffect} from 'react';
import {Platform, StatusBar, ToastAndroid, View} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import {sendDeviceId} from './api';
import useApp from './hooks/useApp';
import Notification from './libs/notification';
import ActivityLog from './screens/activityLog';
import HomeNavigation from './screens/homeNavigation';
import Login from './screens/login';
import Students from './screens/students';

const Stack = createStackNavigator();

export default function Navigations() {
  const {theme} = useTheme();
  const app = useApp();

  const {mutate} = useMutation({
    mutationKey: ['sendDeviceId'],
    mutationFn: sendDeviceId,
    onSuccess: () => {
      ToastAndroid.show(
        'Device Synced Successfully',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        ToastAndroid.CENTER,
      );
    },
  });

  const sendDeviceIdToServer = useCallback(async () => {
    const deviceId = await getUniqueId();
    const platform = Platform.OS;
    const pushTokenId = Notification.getToken();
    mutate({
      mobileId: deviceId,
      pushTokenId,
      platform,
    });
  }, [mutate]);

  useEffect(() => {
    sendDeviceIdToServer();
  }, [sendDeviceIdToServer]);

  return (
    <>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <View style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HomeNavigation"
              component={HomeNavigation}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ActivityLog"
              component={ActivityLog}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Students"
              component={Students}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
}
