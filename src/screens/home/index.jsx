import {Avatar, Icon, Text, makeStyles, useTheme} from '@rneui/themed';
import {englishToNepaliNumber} from 'nepali-number';
import React, {useEffect, useRef} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {currentYear, days, getCurrentDate} from '../../libs/calendar';
import Activity from './Activity';
import Stats from './Stats';

export default function Home() {
  const styles = useStyles();
  const {theme} = useTheme();
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.profileContainer}>
          <Avatar
            size={64}
            rounded
            title="AA"
            containerStyle={styles.avatarContainer}
          />
          <View style={{flex: 1}}>
            <Text h4>John Doe</Text>
            <Text style={styles.h5}>Student</Text>
          </View>
          <View>
            <Icon raised name="menu" type="ionicon" />
          </View>
        </View>
        <View
          style={[
            styles.padding16,
            {backgroundColor: theme.colors.background},
          ]}>
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
              gap: 16,
            }}>
            <Stats />
          </View>
        </View>
        <Activity />
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
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.dark,
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
