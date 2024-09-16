import {Avatar, Icon, Text, makeStyles, useTheme} from '@rneui/themed';
import {useQuery} from '@tanstack/react-query';
import dayjs from 'dayjs';
import {englishToNepaliNumber} from 'nepali-number';
import React, {useEffect, useMemo, useRef} from 'react';
import {
  RefreshControl,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {getMyActivity} from '../../api';
import useApp from '../../hooks/useApp';
import {currentYear, days, getCurrentDate} from '../../libs/calendar';
import Activity from './Activity';
import Stats from './Stats';

export default function Home({refetchMe}) {
  const styles = useStyles();
  const {theme} = useTheme();
  const app = useApp();
  const today = getCurrentDate();

  const user = useMemo(() => {
    return app?.me || null;
  }, [app]);

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['attendance-stats'],
    queryFn: getMyActivity({
      from: today,
      to: today,
      stats: app?.me?.isClassTeacher,
    }),
  });

  const {
    data: activityData,
    isLoading: isActivityLoading,
    refetch: refetchActivity,
  } = useQuery({
    queryKey: ['activity'],
    queryFn: getMyActivity({
      limit: 10,
      page: 1,
    }),
  });

  const stats = useMemo(() => {
    const checkIn = data?.data?.data?.days[0]?.checkin
      ? dayjs(data.data.data.days[0].checkin).format('HH:mm A')
      : '';
    const checkOut = data?.data?.data?.days[0]?.checkout
      ? dayjs(data.data.data.days[0].checkout).format('HH:mm A')
      : '';
    const totalPresent = data?.data?.data?.stats?.present;
    const totalAbsent = data?.data?.data?.stats?.total - totalPresent;
    return {
      checkIn,
      checkOut,
      totalPresent,
      totalAbsent,
    };
  }, [data]);

  return (
    <View style={{flex: 1}}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              refetch();
              refetchActivity();
              refetchMe();
            }}
          />
        }>
        <View style={styles.profileContainer}>
          <Avatar
            size={50}
            rounded
            title={user?.first_name.charAt(0) + user?.last_name.charAt(0) || ''}
            containerStyle={styles.avatarContainer}
          />
          <View style={{flex: 1}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {user?.first_name + ' ' + user?.last_name}
            </Text>
            <Text style={styles.h5}>
              {user?.isClassTeacher ? 'Class Teacher' : user?.role}
            </Text>
          </View>
          <View>
            <Icon
              raised
              name={
                app?.me?.isPresent > 0
                  ? 'account-check-outline'
                  : 'account-cancel-outline'
              }
              type="material-community"
              color={
                app?.me?.isPresent > 0
                  ? theme.colors.success
                  : theme.colors.error
              }
              size={18}
              onPress={() => {
                ToastAndroid.show(
                  app?.me?.isPresent
                    ? 'You are present today'
                    : 'You are absent today',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                  ToastAndroid.CENTER,
                );
              }}
            />
          </View>
        </View>
        <View style={[{backgroundColor: theme.colors.background}]}>
          <CalendarComponent />
        </View>
        <View style={styles.padding16}>
          <Text style={[styles.h5]}>Today Attendance</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingVertical: 16,
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 8,
            }}>
            <Stats statsData={stats} />
          </View>
        </View>
        <Activity data={activityData} isLoading={isActivityLoading} />
      </ScrollView>
    </View>
  );
}

const CalendarComponent = () => {
  const styles = useStyles();
  const today = getCurrentDate() || '';
  const [year, month, day] = today.split('-');
  const yearData = currentYear(year);

  const monthData = yearData[+month - 1];

  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.scrollTo({
        x: (+day - 4) * 60,
        y: 0,
        animated: true,
      });
    }
  }, [day]);

  const getWeekNumber = num => {
    const mod = num % 7;
    if (mod === 0) return 0;
    else return mod;
  };

  const datas = Array.from({length: monthData.endDate}, (v, i) => ({
    dayName: days[getWeekNumber(monthData.weekStart + i)],
    day: englishToNepaliNumber(i + 1),
    isActive: Boolean(i + 1 === +day),
  })).map(v => v);

  return (
    <View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{paddingVertical: 16}}
        ref={calendarRef}>
        {datas.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.calendarBtn,
                item?.isActive && styles.activeCalendarBtn,
              ]}>
              <Text
                style={[
                  styles.calendarBtnDay,
                  item?.isActive && styles.activeCalendarBtnText,
                ]}>
                {item.day}
              </Text>
              <Text
                style={[
                  styles.calendarBtnWeekDay,
                  item?.isActive && styles.activeCalendarBtnText,
                ]}>
                {item.dayName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
  },
  padding16: {
    padding: 16,
  },
  profileContainer: {
    padding: 16,
    flexDirection: 'row',
    columnGap: 16,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  avatarContainer: {
    backgroundColor: theme.colors.primary,
  },
  h5: {
    fontSize: 16,
    fontWeight: 'condensedBold',
    color: theme.colors.grey3,
    textTransform: 'capitalize',
  },
  calendarBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 6,
  },
  activeCalendarBtn: {
    backgroundColor: theme.colors.primary,
  },
  activeCalendarBtnText: {
    color: theme.colors.white,
  },
  calendarBtnDay: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 3,
    fontWeight: 'bold',
  },
  calendarBtnWeekDay: {
    fontSize: 14,
    textAlign: 'center',
    color: theme.colors.gray[500],
  },
}));
