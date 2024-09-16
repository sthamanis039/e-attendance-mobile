import {useNavigation} from '@react-navigation/native';
import {Avatar, Dialog, Icon, ListItem, Text, useTheme} from '@rneui/themed';
import React, {useState} from 'react';
import {Linking, ScrollView, View} from 'react-native';
import useApp from '../hooks/useApp';

export default function Profile() {
  const {theme} = useTheme();
  const app = useApp();

  console.log('me', app?.me);
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          justifyContent: 'center',
          padding: 32,
          alignItems: 'center',
          minHeight: '30%',
          backgroundColor: theme.colors.background,
          rowGap: 4,
        }}>
        <Avatar
          rounded
          size={100}
          containerStyle={{backgroundColor: theme.colors.primary}}
          title={
            app?.me?.first_name?.charAt(0) + app?.me?.last_name?.charAt(0) || ''
          }
        />
        <Text style={{fontWeight: 'bold', marginTop: 8, fontSize: 18}}>
          {app?.me?.first_name + ' ' + app?.me?.last_name}
        </Text>
        <Text
          style={{
            textTransform: 'capitalize',
            fontWeight: 'bold',
            color: theme.colors.grey3,
          }}>
          {app?.me?.isClassTeacher ? 'Class Teacher' : app?.me?.role}
          {app?.me?.grade?.name ? ` - Grade: ${app?.me?.grade?.name}` : 'N/A'}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'condensedBold',
            color: theme.colors.secondary,
          }}>
          {app?.me?.organization?.name || 'Ideabreed School'}
        </Text>
      </View>
      <ScrollView contentContainerStyle={{padding: 8}}>
        {/* <ListItem style={{marginBottom: 8}}>
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
        </ListItem> */}
        <ListItem
          style={{marginBottom: 8}}
          onPress={() =>
            Linking.openURL('https://hajiri.ibis.com.np/privacy-policy')
          }>
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
        {/* {app?.me?.role === 'student' && (
          <ListItem style={{marginBottom: 8}}>
            <Icon raised size={16} name="retweet" type="antdesign" />
            <ListItem.Content>
              <ListItem.Title>Switch Account</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )} */}
        <LogoutButton />
      </ScrollView>
    </View>
  );
}

function LogoutButton() {
  const navigation = useNavigation();
  const app = useApp();
  const {theme} = useTheme();

  const [visible, setVisible] = useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
  };
  return (
    <>
      <ListItem onPress={toggleDialog}>
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
      <Dialog
        overlayStyle={{borderRadius: 16}}
        isVisible={visible}
        onBackdropPress={toggleDialog}>
        <Dialog.Title
          titleStyle={{color: theme.colors.grey2}}
          title="Log Out"
        />
        <Text style={{color: theme.colors.grey3}}>
          Are you sure you want to log out of this device?
        </Text>
        <Dialog.Actions>
          <Dialog.Button
            title="Logout"
            titleStyle={{color: theme.colors.error}}
            onPress={() => {
              app?.logOut && app?.logOut();
              toggleDialog();
              navigation.navigate('Login');
            }}
          />
          <Dialog.Button title="Cancel" onPress={toggleDialog} />
        </Dialog.Actions>
      </Dialog>
    </>
  );
}
