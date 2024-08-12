import PushNotification from 'react-native-push-notification';
class Notifications {
  constructor() {
    this.token = null;
    PushNotification.configure({
      onRegister: token => {
        this.token = token.token;
        console.log('TOKEN:', token);
      },
      onNotification: notification => {
        console.log('NOTIFICATION:', notification);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    PushNotification.createChannel(
      {
        channelId: 'Reminder', // (required)
        channelName: 'Task reminder notifications', // (required)
        channelDescription: 'Reminder for any tasks',
      },
      () => {},
    );
  }

  getToken() {
    return this.token;
  }

  schduleNotification(payload) {
    PushNotification.localNotification(payload);
  }

  scheduleLocalNotification(payload) {
    PushNotification.localNotificationSchedule(payload);
  }
}

export default new Notifications();
