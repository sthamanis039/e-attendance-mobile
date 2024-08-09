import {Button, makeStyles, Text, useTheme} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import ActivityListItem from '../../components/ActivityListItem';

export default function Activity() {
  const styles = useStyles();
  const {theme} = useTheme();
  return (
    <View style={{padding: 16}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.h5}>Your Activity</Text>
        <Button
          buttonStyle={{
            backgroundColor: 'transparent',
          }}
          titleStyle={{
            color: theme.colors.primary,
          }}
          title="View All"
        />
      </View>
      <View style={{rowGap: 8}}>
        {[
          {type: 'checkin', date: '2021/04/21', time: '09:00 AM'},
          {type: 'checkout', date: '2021/04/21', time: '09:00 AM'},
          {type: 'checkin', date: '2021/04/21', time: '09:00 AM'},
          {type: 'checkout', date: '2021/04/21', time: '09:00 AM'},
          {type: 'checkin', date: '2021/04/21', time: '09:00 AM'},
          {type: 'checkout', date: '2021/04/21', time: '09:00 AM'},
        ].map((_, i) => (
          <ActivityListItem key={i} {..._} />
        ))}
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
