import {Button, makeStyles, Text, useTheme} from '@rneui/themed';
import React, {useMemo} from 'react';
import {ActivityIndicator, View} from 'react-native';
import ActivityListItem from '../../components/ActivityListItem';
import useApp from '../../hooks/useApp';

export default function Activity({data, isLoading}) {
  const styles = useStyles();
  const {theme} = useTheme();

  const app = useApp();

  const dataList = useMemo(() => {
    return data?.data?.data?.days
      ?.map(day => {
        if (day?.status === 'A') {
          return {
            type: 'absent',
            date: day.date,
          };
        }
        return [
          {
            type: 'checkout',
            date: day.date,
            time: day.checkout.split(' ')[1],
          },
          {
            type: 'checkin',
            date: day.date,
            time: day.checkin.split(' ')[1],
          },
        ];
      })
      .flat();
  }, [data]);

  return (
    <View style={{padding: 16, paddingBottom: 60}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 8,
        }}>
        <Text style={styles.h5}>Your Activity</Text>
        {!app?.me?.role === 'student' && (
          <Button
            buttonStyle={{
              backgroundColor: 'transparent',
            }}
            titleStyle={{
              color: theme.colors.primary,
            }}
            title="View All"
          />
        )}
      </View>
      <View style={{rowGap: 8}}>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          dataList.map((_, i) => <ActivityListItem key={i} {..._} />)
        )}
      </View>
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  h5: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.dark,
  },
}));
