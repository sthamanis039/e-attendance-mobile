/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import 'react-native-gesture-handler';
import prettylog from './src/utils/prettylog';

global.log = prettylog;

requestUserPermission();

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

const navigationMethod = remoteMessage => {
  if (remoteMessage) {
    // Linking.openURL(`optonome://chatRoom/${remoteMessage.data.fromUser}`);
    const {
      data: {type},
    } = remoteMessage;

    console.log(type, 'test ');
  }
};

messaging().onNotificationOpenedApp(remoteMessage => {
  console.log(
    'Notification caused app to open from background state:',
    remoteMessage,
  );

  navigationMethod(remoteMessage);
});
// Check whether an initial notification is available

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  const {
    data: {type},
  } = remoteMessage;
  // navigationMethod(remoteMessage);
  // if (type === 'room_message') {
  //   const {
  //     data: { chatroom, team, chatRoomType, name, teamName },
  //   } = remoteMessage;
  //   navigate('ChannelChatRoom', {
  //     chatRoomId: chatroom,
  //     chatRoomTitle: name,
  //     teamName,
  //     type: chatRoomType,
  //     teamId: team,
  //   });
  // } else if (type === 'direct_message') {
  //   const {
  //     data: { fromUser, messageId },
  //   } = remoteMessage;
  //   // setTimeout(() => {
  //   //   Alert.alert(
  //   //     remoteMessage.notification.title,
  //   //     remoteMessage.notification.body,
  //   //   );
  //   // }, 100);
  //   navigate('ChatRoom', {
  //     chatUser: {
  //       id: fromUser,
  //       user: { name: 'Rojin Shrestha' },
  //     },
  //   });
  // }
  // console.log(type, 'test ');
  // // setTimeout(() => {
  // //   Alert.alert(
  // //     remoteMessage.notification.title,
  // //     remoteMessage.notification.body,
  // //   );
  // // }, 100);
});

// handler for remote messages that arrive while the app is in foreground state
messaging().onMessage(async remoteMessage => {
  console.log('Message handled in the foreground!', remoteMessage);
  // return <IncomingCall />;
  // Alert.alert(
  //   'Calling...',
  //   'Do you want to join call?',
  //   [
  //     {
  //       text: 'Cancel',
  //       onPress: () => {
  //         console.log('Cancel Pressed');
  //       },
  //       style: 'cancel',
  //     },
  //     {
  //       text: 'Okay',
  //       onPress: () => {},
  //     },
  //   ],
  //   { cancelable: true },
  // );
  // if (Platform.OS === 'ios') {
  //   PushNotificationIOS.presentLocalNotification({
  //     alertBody: remoteMessage.notification.body,
  //     alertTitle: remoteMessage.notification.title,
  //   });
  // } else {
  //   Alert.alert(
  //     remoteMessage.notification.title,
  //     remoteMessage.notification.body,
  //   );
  // }
});

AppRegistry.registerComponent(appName, () => App);
