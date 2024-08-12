import {useNavigation} from '@react-navigation/native';
import {Avatar, Icon, ListItem, Text, useTheme} from '@rneui/themed';
import React from 'react';
import {ScrollView, View} from 'react-native';
import useApp from '../hooks/useApp';

export default function Profile() {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const app = useApp();
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          justifyContent: 'center',
          padding: 32,
          alignItems: 'center',
          minHeight: '30%',
          backgroundColor: theme.colors.background,
        }}>
        <Avatar
          rounded
          size={100}
          containerStyle={{backgroundColor: theme.colors.primary}}
          title="AA"
        />
        <Text style={{fontWeight: 'bold', marginTop: 8, fontSize: 18}}>
          John Doe
        </Text>
        <Text>Grade: Five "A"</Text>
      </View>
      <ScrollView contentContainerStyle={{padding: 8}}>
        <ListItem style={{marginBottom: 8}}>
          <Icon raised size={16} name="settings-outline" type="ionicon" />
          <ListItem.Content>
            <ListItem.Title>Settings</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem style={{marginBottom: 8}}>
          <Icon raised size={16} name="document-text-outline" type="ionicon" />
          <ListItem.Content>
            <ListItem.Title>Terms & Conditions</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem style={{marginBottom: 8}}>
          <Icon
            raised
            size={16}
            name="shield-checkmark-outline"
            type="ionicon"
          />
          <ListItem.Content>
            <ListItem.Title>Privacy Policy</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem style={{marginBottom: 8}}>
          <Icon raised size={16} name="retweet" type="antdesign" />
          <ListItem.Content>
            <ListItem.Title>Switch Account</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem
          onPress={() => {
            app?.logOut && app?.logOut();
            navigation.navigate('Login');
          }}>
          <Icon
            raised
            name="logout"
            type="simple-line-icons"
            color={theme.colors.error}
            size={16}
          />
          <ListItem.Content>
            <ListItem.Title
              style={{color: theme.colors.error, fontWeight: 'bold'}}>
              Log Out
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </ScrollView>
    </View>
  );
}
