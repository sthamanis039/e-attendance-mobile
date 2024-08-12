import {useNavigation, useRoute} from '@react-navigation/native';
import {Avatar, Icon, ListItem, SearchBar, useTheme} from '@rneui/themed';
import React from 'react';
import {ScrollView, View} from 'react-native';
import Header from '../../components/Header';

export default function Students() {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  console.log('student route', route);

  return (
    <View style={{flex: 1}}>
      <Header title="My Class" noBack />
      <ScrollView>
        <SearchBar />
        <View style={{padding: 8}}>
          {Array.from({length: 10}).map((_, i) => (
            <ListItem
              style={{
                marginBottom: 8,
                borderLeftWidth: 8,
                borderLeftColor: theme.colors.success,
                borderRightWidth: 8,
                borderRightColor: theme.colors.white,
                borderRadius: 8,
              }}
              onPress={() => navigation.navigate('ActivityLog')}
              key={i}>
              <Avatar
                size={40}
                rounded
                title="Rd"
                containerStyle={{backgroundColor: theme.colors.primary}}
              />
              <ListItem.Content>
                <ListItem.Title>John Doe</ListItem.Title>
                <ListItem.Subtitle>1</ListItem.Subtitle>
              </ListItem.Content>
              <Icon
                reverse
                size={16}
                name="phone"
                color={theme.colors.secondary}
              />
            </ListItem>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
