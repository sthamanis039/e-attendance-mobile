import {useNavigation} from '@react-navigation/native';
import {Button, Icon, Text, useTheme} from '@rneui/themed';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import COLORS from '../../constants/colors';
import useApp from '../../hooks/useApp';

const stats = [
  {
    key: 'checkIn',
    title: 'Check In',
    icon: 'login',
    color: COLORS.primary[100],
    allowedRole: '*',
  },
  {
    key: 'checkOut',
    title: 'Check Out',
    icon: 'logout',
    color: COLORS.primary[100],
    allowedRole: '*',
  },
  {
    key: 'totalPresent',
    title: 'Total Present',
    icon: 'check',
    color: COLORS.secondary[300],
    navigate: {to: 'Students', params: {type: 'present'}},
    allowedRole: '!student',
  },
  {
    key: 'totalAbsent',
    title: 'Total Absent',
    icon: 'close',
    color: COLORS.tertiary[300],
    navigate: {to: 'Students', params: {type: 'absent'}},
    allowedRole: '!student',
  },
  {
    key: 'late',
    title: 'Late',
    icon: 'fastbackward',
    color: COLORS.secondary[100],
    navigate: {to: 'Students', params: {type: 'late'}},
    allowedRole: '!student',
  },
  {
    key: 'onLeave',
    title: 'On Leave',
    icon: 'calendar',
    color: COLORS.tertiary[100],
    navigate: {to: 'Students', params: {type: 'onLeave'}},
    allowedRole: '!student',
  },
];

export default function Stats({statsData = {}}) {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const app = useApp();

  return (
    <>
      {stats
        .filter(stat => {
          let roles = [].concat([stat.allowedRole]).flat();
          if (roles.includes('!' + app?.user?.role)) return false;
          if (roles.includes('*')) return true;
          if (roles.includes(app?.user?.role)) return true;
          return false;
        })
        .map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              padding: 16,
              backgroundColor: theme.colors.background,
              borderRadius: 8,
              flexBasis: '48%',
            }}
            onPress={() => {
              if (item.navigate) {
                navigation.navigate(item.navigate.to, item.navigate.params);
              }
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 8,
              }}>
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
              {statsData[item.key] || 'N/A'}
            </Text>
          </TouchableOpacity>
        ))}
    </>
  );
}
