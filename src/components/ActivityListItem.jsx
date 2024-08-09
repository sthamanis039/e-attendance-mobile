import {Button, Icon, ListItem, useTheme} from '@rneui/themed';
import React from 'react';

export default function ActivityListItem({
  type = 'checkin',
  date = '2081/04/21',
  time = '09:00 AM',
}) {
  const {theme} = useTheme();
  return (
    <ListItem style={{borderRadius: 16}}>
      <Button
        buttonStyle={{
          backgroundColor: theme.colors.primaryShades[100],
          paddingHorizontal: 8,
          paddingVertical: 8,
        }}>
        <Icon
          name={type === 'checkin' ? 'login' : 'logout'}
          type="antdesign"
          size={14}
        />
      </Button>
      <ListItem.Content>
        <ListItem.Title style={{fontWeight: 'bold'}}>
          {type === 'checkin' ? 'Check In' : 'Check Out'}
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
          {time}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
}
