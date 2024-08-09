import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '@rneui/themed';
import React from 'react';
import {StatusBar, View} from 'react-native';
import HomeNavigation from './screens/homeNavigation';
import Login from './screens/login';

const Stack = createStackNavigator();

export default function Navigations() {
  const {theme} = useTheme();
  return (
    <>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      {/* eslint-disable-next-line react-native/no-inline-styles */}
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
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
}
