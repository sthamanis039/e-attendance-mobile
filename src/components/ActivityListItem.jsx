import {Button, Icon, ListItem, useTheme} from '@rneui/themed';
import React from 'react';

export default function ActivityListItem({type, date, time}) {
  const {theme} = useTheme();
  return (
    <ListItem style={{borderRadius: 16}}>
      <Button
        buttonStyle={{
          backgroundColor:
            type === 'absent'
              ? theme.colors.tertiaryShades[100]
              : theme.colors.primaryShades[100],
          paddingHorizontal: 8,
          paddingVertical: 8,
        }}>
        <Icon
          name={
            type === 'checkin'
              ? 'login'
              : type === 'checkout'
              ? 'logout'
              : 'close'
          }
          type="antdesign"
          size={14}
        />
      </Button>
      <ListItem.Content>
        <ListItem.Title style={{fontWeight: 'bold'}}>
          {type === 'checkin'
            ? 'Check In'
            : type === 'checkout'
            ? 'Check Out'
            : 'Absent'}
        </ListItem.Title>
        <ListItem.Subtitle>{date}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content>
        <ListItem.Title
          style={{
            textAlign: 'right',
            alignSelf: 'flex-end',
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          {time ? time : ''}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
}
