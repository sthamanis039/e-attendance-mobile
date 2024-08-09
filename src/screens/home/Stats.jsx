import {Button, Icon, Text, useTheme} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import COLORS from '../../constants/colors';

const stats = [
  {
    title: 'Check In',
    icon: 'login',
    color: COLORS.primary[100],
    value: '09:00 AM',
  },
  {
    title: 'Check Out',
    icon: 'logout',
    color: COLORS.primary[100],
    value: '06:00 PM',
  },
  {
    title: 'Total Present',
    icon: 'check',
    color: COLORS.secondary[300],
    value: 98,
  },
  {
    title: 'Total Absent',
    icon: 'close',
    color: COLORS.tertiary[300],
    value: 2,
  },
  {title: 'Late', icon: 'fastbackward', color: COLORS.secondary[100], value: 2},
  {title: 'On Leave', icon: 'calendar', color: COLORS.tertiary[100], value: 1},
];

export default function Stats() {
  const {theme} = useTheme();

  return (
    <>
      {stats.map((item, index) => (
        <View
          key={index}
          style={{
            padding: 16,
            backgroundColor: theme.colors.background,
            borderRadius: 8,
            flexBasis: '48%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 8,
            }}>
            {console.log(item?.color)}
            <Button
              buttonStyle={{
                backgroundColor: item.color,
                paddingHorizontal: 8,
                paddingVertical: 8,
              }}>
              <Icon name={item.icon} type="antdesign" size={14} />
            </Button>
            <Text>{item.title}</Text>
          </View>
          <Text
            style={{
              fontSize: 20,
              paddingVertical: 8,
              textAlign: 'center',
              fontWeight: '700',
              color: theme.colors.dark,
            }}>
            {item?.value}
          </Text>
        </View>
      ))}
    </>
  );
}
