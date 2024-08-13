import {useNavigation} from '@react-navigation/native';
import {Icon, makeStyles, useTheme} from '@rneui/themed';
import React, {useCallback, useEffect} from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import useApp from '../hooks/useApp';
import Home from './home';
// import Holiday from './holiday';
// import Leaves from './leaves';
import {useQuery} from '@tanstack/react-query';
import {getMe} from '../api';
import {removeFromStorage} from '../libs/storage';
import Profile from './profile';

export default function HomeNavigation() {
  const styles = useStyles();
  const app = useApp();
  const navigation = useNavigation();

  const {data, isLoading, error} = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    staleTime: Infinity,
  });

  const getLoggedInUser = useCallback(async () => {
    let user = app?.user;
    if (!user) {
      user = await app?.getUser();
      app?.setUser(user);
    }
    if (!user) {
      navigation.navigate('Login');
    }
  }, [app, navigation]);

  useEffect(() => {
    getLoggedInUser();
  }, [getLoggedInUser]);

  useEffect(() => {
    if (error?.response?.status === 401) {
      removeFromStorage('user');
      app?.setUser(null);
      navigation.navigate('Login');
    }
    if (!isLoading) {
      app?.setMe && app.setMe(data?.data?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data]);

  return (
    <CurvedBottomBar.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={55}
      circleWidth={50}
      bgColor="white"
      initialRouteName="Home"
      borderTopLeftRight
      renderCircle={({selectedTab, navigate}) => (
        <Animated.View style={styles.btnCircleDown}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              app?.me?.role === 'student'
                ? navigation.navigate('ActivityLog')
                : navigation.navigate('Students', {
                    title: app?.me?.isClassTeacher
                      ? 'My Students'
                      : 'All Students',
                  })
            }>
            <Icon
              name={app?.me?.role === 'student' ? 'list' : 'people-outline'}
              type="ionicons"
              color="white"
              size={25}
            />
          </TouchableOpacity>
        </Animated.View>
      )}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={rest => <RenderTabBar {...rest} />}
      screenOptions={{headerShown: false}}>
      <CurvedBottomBar.Screen name="Home" position="LEFT" component={Home} />
      {/* <CurvedBottomBar.Screen name="Leave" position="LEFT" component={Leaves} /> */}
      {/* <CurvedBottomBar.Screen
        name="Holiday"
        position="RIGHT"
        component={Holiday}
      /> */}
      <CurvedBottomBar.Screen
        name="Profile"
        position="RIGHT"
        component={Profile}
      />
    </CurvedBottomBar.Navigator>
  );
}

const _renderIcon = (routeName, selectedTab, activeColor, inActiveColor) => {
  let IconComponent = '';

  switch (routeName) {
    case 'Home':
      IconComponent = () => (
        <Icon
          name="home-outline"
          type="ionicon"
          size={25}
          color={selectedTab === routeName ? activeColor : inActiveColor}
        />
      );
      break;
    case 'Leave':
      IconComponent = () => (
        <Icon
          name="calendar-outline"
          type="ionicon"
          size={25}
          color={selectedTab === routeName ? activeColor : inActiveColor}
        />
      );
      break;
    case 'Holiday':
      IconComponent = () => (
        <Icon
          name="holiday-village"
          type="fontisto"
          size={25}
          color={selectedTab === routeName ? activeColor : inActiveColor}
        />
      );
      break;
    case 'Profile':
      IconComponent = () => (
        <Icon
          name="person-outline"
          type="ionicon"
          size={25}
          color={selectedTab === routeName ? activeColor : inActiveColor}
        />
      );
      break;
  }
  return <IconComponent />;
};

const RenderTabBar = ({routeName, selectedTab, navigate}) => {
  const styles = useStyles();
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      onPress={() => navigate(routeName)}
      style={styles.tabbarItem}>
      {_renderIcon(
        routeName,
        selectedTab,
        theme.colors.primary,
        theme.colors.black,
      )}
    </TouchableOpacity>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleDown: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    bottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabbarItem: {
    color: theme.colors.primary,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },

  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
}));
