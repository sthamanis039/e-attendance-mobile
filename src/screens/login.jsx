import {useNavigation} from '@react-navigation/native';
import {
  Button,
  Icon,
  Image,
  Input,
  makeStyles,
  Text,
  useTheme,
} from '@rneui/themed';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';

export default function Login() {
  const styles = useStyles();
  const {t} = useTranslation();
  const {theme} = useTheme();
  const navigation = useNavigation();

  const [visible, setVisible] = React.useState(true);

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
        <View>
          <Input label={t('Email Address')} />
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
          />
          <Text style={[styles.textPrimary, styles.forgotPassword]}>
            Forgot Password?
          </Text>
        </View>
        <View>
          <Button
            title="Login"
            buttonStyle={styles.buttonStyle}
            onPress={() => navigation.navigate('HomeNavigation')}
          />
        </View>
      </View>
    </View>
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
