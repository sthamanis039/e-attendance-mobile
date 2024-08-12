import {Icon, Text, useTheme} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';

export default function Holiday() {
  const {theme} = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon name="settings" size={100} color={theme.colors.grey4} />
      <Text
        style={{
          fontWeight: 'bold',
          marginTop: 8,
          fontSize: 18,
          color: theme.colors.grey4,
        }}>
        In Progress....
      </Text>
    </View>
  );
}
