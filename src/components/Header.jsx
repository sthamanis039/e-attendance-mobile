import {useNavigation} from '@react-navigation/native';
import {Icon, Text, useTheme} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';

export default function Header({title, noBack = false}) {
  const {theme} = useTheme();
  const navigation = useNavigation();
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: theme.colors.background,
        color: theme.colors.dark,
      }}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 16,
        }}>
        {!noBack && (
          <Icon
            name="arrowleft"
            type="antdesign"
            onPress={() => navigation.goBack()}
          />
        )}
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
}
