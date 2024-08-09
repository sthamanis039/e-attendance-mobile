import {Alert, ToastAndroid} from 'react-native';
import {RESULTS, check, request} from 'react-native-permissions';

function requestPermission(permission) {
  request(`android.permission.${permission}`).then(result => {
    ToastAndroid.show(
      result,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      ToastAndroid.CENTER,
    );
  });
}

export default function checkAndGrantPermission(permission) {
  try {
    check(`android.permission.${permission}`).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Alert.alert(`Permission ${permission} is unavailable`);
          break;
        case RESULTS.DENIED:
          requestPermission(permission);
          break;
        case RESULTS.LIMITED:
          Alert.alert(`Permission ${permission} is limited`);
          break;
        case RESULTS.GRANTED:
          return;
        case RESULTS.BLOCKED:
          Alert.alert(`Permission ${permission} is required to use this app`);
          break;
        default:
          requestPermission(permission);
          break;
      }
    });
  } catch (error) {
    global.log(error);
  }
}
