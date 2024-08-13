import {useNavigation} from '@react-navigation/native';
import {
  Button,
  ButtonGroup,
  Icon,
  Image,
  Input,
  Text,
  makeStyles,
  useTheme,
} from '@rneui/themed';
import {useMutation} from '@tanstack/react-query';
import React, {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, View} from 'react-native';
import {login, loginStaff} from '../api';
import useApp from '../hooks/useApp';

export default function Login() {
  const styles = useStyles();
  const {t} = useTranslation();
  const navigation = useNavigation();

  const app = useApp();

  const ROLES = [t('Student/Parent'), t('Staff')];
  const [selectedRole, setSelectedRole] = useState(0);

  const {handleSubmit, setValue, getValues} = useForm();

  const {mutate, isPending} = useMutation({
    mutationKey: ['login-student'],
    mutationFn: login,
    onSuccess: response => {
      app?.setUsers && app.setUsers(response?.data?.data);
      let loggedInUser = response?.data?.data?.find(user => {
        return (
          user?.date_of_birth_ad === getValues('date_of_birth') ||
          user?.date_of_birth_bs === getValues('date_of_birth')
        );
      });
      app?.setUser && app.setUser(loggedInUser);
      navigation.navigate('HomeNavigation');
    },
  });

  const {mutate: mutateStaffLogin, isPending: isStaffLoginPending} =
    useMutation({
      mutationKey: ['login-staff'],
      mutationFn: loginStaff,
      onSuccess: response => {
        console.log('login', response);
        app?.setUsers && app.setUsers([response?.data?.data]);
        app?.setUser && app.setUser(response?.data?.data);
        navigation.navigate('HomeNavigation');
      },
    });

  function onSubmit(data) {
    console.log('login data', data);
    if (selectedRole === 0) {
      mutate(data);
    }
    if (selectedRole === 1) {
      mutateStaffLogin(data);
    }
  }

  const getLoggedInUser = useCallback(async () => {
    let user = app?.user;
    if (!user) {
      user = await app?.getUser();
    }
    if (user) {
      navigation.navigate('HomeNavigation');
    }
  }, [app, navigation]);

  useEffect(() => {
    getLoggedInUser();
  }, [getLoggedInUser]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.imgStyle} />
      <Text h3>{t('welcomeBack')} 👋</Text>
      <Text h3>
        {t('to')}{' '}
        <Text h3 h3Style={styles.textPrimary}>
          {t('HRAttendee')}
        </Text>
      </Text>
      <Text style={styles.textHello}>
        {t('Hello there, login to continue')}
      </Text>
      <View style={styles.formContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            I am
          </Text>
          <ButtonGroup
            containerStyle={{flexGrow: 1, borderRadius: 16}}
            buttons={ROLES}
            selectedIndex={selectedRole}
            onPress={setSelectedRole}
          />
        </View>
        {selectedRole === 0 && <StudentLoginForm setValue={setValue} />}
        {selectedRole === 1 && <StaffLoginForm setValue={setValue} />}
        <View>
          <Button
            buttonStyle={styles.buttonStyle}
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}>
            {isPending ? <ActivityIndicator size="small" /> : null}
            {t('Login')}
          </Button>
        </View>
      </View>
    </View>
  );
}

function StudentLoginForm({setValue}) {
  const {t} = useTranslation();

  return (
    <>
      <View>
        <Input
          label={t('Phone Number')}
          inputMode="tel"
          onChangeText={text => setValue('phone', text)}
        />
      </View>
      <View>
        <Input
          label={t('Date of Birth')}
          onChangeText={text => setValue('date_of_birth', text)}
        />
      </View>
    </>
  );
}

function StaffLoginForm({setValue}) {
  const {theme} = useTheme();
  const [visible, setVisible] = React.useState(true);
  const styles = useStyles();
  const {t} = useTranslation();

  return (
    <>
      <View>
        <Input
          label={t('Email Address/Username')}
          onChangeText={text => setValue('username', text)}
        />
      </View>
      <View>
        <Input
          label={t('Password')}
          secureTextEntry={visible}
          rightIcon={
            <Icon
              name={visible ? 'eye' : 'eye-off'}
              type="material-community"
              color={theme.colors.gray[500]}
              onPress={() => setVisible(!visible)}
            />
          }
          onChangeText={text => setValue('password', text)}
        />
        <Text style={[styles.textPrimary, styles.forgotPassword]}>
          Forgot Password?
        </Text>
      </View>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: theme.colors.background,
  },
  imgStyle: {
    height: 100,
    width: 100,
    objectFit: 'contain',
    marginBottom: 8,
  },
  textPrimary: {
    color: theme.colors.primary,
  },
  textHello: {
    color: theme.colors.gray[500],
    paddingVertical: 8,
  },
  formContainer: {
    paddingVertical: 16,
    rowGap: 16,
  },
  forgotPassword: {
    marginVertical: 12,
    alignSelf: 'flex-end',
  },
  buttonStyle: {
    paddingVertical: 20,
  },
}));

// {
//   "data": {
//       "data": [
//           {
//               "isEmailVerified": false,
//               "status": "active",
//               "privilege": "0",
//               "userType": "Student",
//               "userId": 1,
//               "first_name": "Krishna Dev",
//               "last_name": "Sah",
//               "card_number": "11987168",
//               "role": "student",
//               "email": "1@ibis.com.np",
//               "username": "1@ibis.com.np",
//               "createdAt": "2024-08-08T09:33:37.810Z",
//               "image": "2937.jpg",
//               "address": "Jadibuti",
//               "phone": "9843992633",
//               "date_of_birth_bs": "2065-5-8",
//               "roll_no": "1",
//               "grade": "66b48bc6ea78f7001c63a841",
//               "date_of_birth_ad": "2008-08-24",
//               "validity": "2081-12-32",
//               "id": "66b490f1ea78f7001c63af0d",
//               "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiMUBpYmlzLmNvbS5ucCIsInN1YiI6IjY2YjQ5MGYxZWE3OGY3MDAxYzYzYWYwZCIsImp0aSI6IjVjZDNjNDc0NTVjN2JmYTA2M2VmMGZhMTg0ZDQ5MjMzIiwiaWF0IjoxNzIzMjA2MzU2LCJleHAiOjE3MjMyMjQzNTYsInRva2VuX3R5cGUiOiJhY2Nlc3MifQ.lF7D4Sd5qrnuJZq7tv9kDfRQedBLSJByZloPQW-U1OI",
//               "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiMUBpYmlzLmNvbS5ucCIsInN1YiI6IjY2YjQ5MGYxZWE3OGY3MDAxYzYzYWYwZCIsImp0aSI6IjFkN2FlNDM3NTVmNTBmN2NjNjFkYmQyMWZmYzIxMGJhIiwiaWF0IjoxNzIzMjA2MzU2LCJleHAiOjE3MjU3OTgzNTYsInRva2VuX3R5cGUiOiJyZWZyZXNoIn0.99148sLAR5rYTti9Ec2sy2Bi4Lznqid_Zf8rg5UufzY"
//           }
//       ]
//   },
//   "status": 200,
//   "headers": {
//       "access-control-allow-origin": "*",
//       "connection": "keep-alive",
//       "content-security-policy": "default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
//       "content-type": "application/json; charset=utf-8",
//       "date": "Fri, 09 Aug 2024 12:25:56 GMT",
//       "etag": "W/\"463-UgDLKkOZjxb37UB5ZSmYhy4UJIs\"",
//       "expect-ct": "max-age=0",
//       "keep-alive": "timeout=5",
//       "referrer-policy": "no-referrer",
//       "strict-transport-security": "max-age=15552000; includeSubDomains",
//       "transfer-encoding": "chunked",
//       "vary": "Accept-Encoding",
//       "x-content-type-options": "nosniff",
//       "x-dns-prefetch-control": "off",
//       "x-download-options": "noopen",
//       "x-frame-options": "SAMEORIGIN",
//       "x-permitted-cross-domain-policies": "none",
//       "x-xss-protection": "0"
//   },
//   "config": {
//       "transitional": {
//           "silentJSONParsing": true,
//           "forcedJSONParsing": true,
//           "clarifyTimeoutError": false
//       },
//       "adapter": [
//           "xhr",
//           "http",
//           "fetch"
//       ],
//       "transformRequest": [
//           null
//       ],
//       "transformResponse": [
//           null
//       ],
//       "timeout": 0,
//       "xsrfCookieName": "XSRF-TOKEN",
//       "xsrfHeaderName": "X-XSRF-TOKEN",
//       "maxContentLength": -1,
//       "maxBodyLength": -1,
//       "env": {},
//       "headers": {
//           "Accept": "application/json, text/plain, */*",
//           "Content-Type": "application/json"
//       },
//       "baseURL": "http://192.168.18.88:8002/api/v1",
//       "method": "post",
//       "url": "/login/student",
//       "data": "{\"phone\":\"9843992633\",\"date_of_birth\":\"2065-5-8\"}"
//   },
//   "request": {
//       "UNSENT": 0,
//       "OPENED": 1,
//       "HEADERS_RECEIVED": 2,
//       "LOADING": 3,
//       "DONE": 4,
//       "readyState": 4,
//       "status": 200,
//       "timeout": 0,
//       "withCredentials": true,
//       "upload": {},
//       "_aborted": false,
//       "_hasError": false,
//       "_method": "POST",
//       "_perfKey": "network_XMLHttpRequest_http://192.168.18.88:8002/api/v1/login/student",
//       "_response": "{\"data\":[{\"isEmailVerified\":false,\"status\":\"active\",\"privilege\":\"0\",\"userType\":\"Student\",\"userId\":1,\"first_name\":\"Krishna Dev\",\"last_name\":\"Sah\",\"card_number\":\"11987168\",\"role\":\"student\",\"email\":\"1@ibis.com.np\",\"username\":\"1@ibis.com.np\",\"createdAt\":\"2024-08-08T09:33:37.810Z\",\"image\":\"2937.jpg\",\"address\":\"Jadibuti\",\"phone\":\"9843992633\",\"date_of_birth_bs\":\"2065-5-8\",\"roll_no\":\"1\",\"grade\":\"66b48bc6ea78f7001c63a841\",\"date_of_birth_ad\":\"2008-08-24\",\"validity\":\"2081-12-32\",\"id\":\"66b490f1ea78f7001c63af0d\",\"access\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiMUBpYmlzLmNvbS5ucCIsInN1YiI6IjY2YjQ5MGYxZWE3OGY3MDAxYzYzYWYwZCIsImp0aSI6IjVjZDNjNDc0NTVjN2JmYTA2M2VmMGZhMTg0ZDQ5MjMzIiwiaWF0IjoxNzIzMjA2MzU2LCJleHAiOjE3MjMyMjQzNTYsInRva2VuX3R5cGUiOiJhY2Nlc3MifQ.lF7D4Sd5qrnuJZq7tv9kDfRQedBLSJByZloPQW-U1OI\",\"refresh\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiMUBpYmlzLmNvbS5ucCIsInN1YiI6IjY2YjQ5MGYxZWE3OGY3MDAxYzYzYWYwZCIsImp0aSI6IjFkN2FlNDM3NTVmNTBmN2NjNjFkYmQyMWZmYzIxMGJhIiwiaWF0IjoxNzIzMjA2MzU2LCJleHAiOjE3MjU3OTgzNTYsInRva2VuX3R5cGUiOiJyZWZyZXNoIn0.99148sLAR5rYTti9Ec2sy2Bi4Lznqid_Zf8rg5UufzY\"}]}",
//       "_url": "http://192.168.18.88:8002/api/v1/login/student",
//       "_timedOut": false,
//       "_trackingName": "unknown",
//       "_incrementalEvents": false,
//       "_performanceLogger": {
//           "_timespans": {
//               "network_XMLHttpRequest_http://192.168.18.88:8002/api/v1/login/student": {
//                   "startTime": 43985021.22142,
//                   "endTime": 43985250.37042,
//                   "totalTime": 229.1490000039339
//               }
//           },
//           "_extras": {},
//           "_points": {
//               "initializeCore_start": 43938869.273481,
//               "initializeCore_end": 43939122.367898
//           },
//           "_pointExtras": {},
//           "_closed": false
//       },
//       "responseHeaders": {
//           "Expect-CT": "max-age=0",
//           "Access-Control-Allow-Origin": "*",
//           "Connection": "keep-alive",
//           "X-DNS-Prefetch-Control": "off",
//           "Transfer-Encoding": "chunked",
//           "Content-Type": "application/json; charset=utf-8",
//           "X-Download-Options": "noopen",
//           "X-XSS-Protection": "0",
//           "Referrer-Policy": "no-referrer",
//           "ETag": "W/\"463-UgDLKkOZjxb37UB5ZSmYhy4UJIs\"",
//           "X-Content-Type-Options": "nosniff",
//           "Vary": "Accept-Encoding",
//           "Date": "Fri, 09 Aug 2024 12:25:56 GMT",
//           "Keep-Alive": "timeout=5",
//           "Strict-Transport-Security": "max-age=15552000; includeSubDomains",
//           "Content-Security-Policy": "default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
//           "X-Frame-Options": "SAMEORIGIN",
//           "X-Permitted-Cross-Domain-Policies": "none"
//       },
//       "_requestId": null,
//       "_headers": {
//           "accept": "application/json, text/plain, */*",
//           "content-type": "application/json"
//       },
//       "_responseType": "",
//       "_sent": true,
//       "_lowerCaseResponseHeaders": {
//           "expect-ct": "max-age=0",
//           "access-control-allow-origin": "*",
//           "connection": "keep-alive",
//           "x-dns-prefetch-control": "off",
//           "transfer-encoding": "chunked",
//           "content-type": "application/json; charset=utf-8",
//           "x-download-options": "noopen",
//           "x-xss-protection": "0",
//           "referrer-policy": "no-referrer",
//           "etag": "W/\"463-UgDLKkOZjxb37UB5ZSmYhy4UJIs\"",
//           "x-content-type-options": "nosniff",
//           "vary": "Accept-Encoding",
//           "date": "Fri, 09 Aug 2024 12:25:56 GMT",
//           "keep-alive": "timeout=5",
//           "strict-transport-security": "max-age=15552000; includeSubDomains",
//           "content-security-policy": "default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
//           "x-frame-options": "SAMEORIGIN",
//           "x-permitted-cross-domain-policies": "none"
//       },
//       "_subscriptions": [],
//       "responseURL": "http://192.168.18.88:8002/api/v1/login/student"
//   }
// }
