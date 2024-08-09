import {Icon, makeStyles, useTheme} from '@rneui/themed';
import React from 'react';
import {Alert, Animated, TouchableOpacity} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import Holiday from './holiday';
import Home from './home';
import Leaves from './leaves';
import Profile from './profile';

export default function HomeNavigation() {
  const styles = useStyles();
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
            onPress={() => Alert.alert('Click Action')}>
            <Icon
              name={'people-outline'}
              type="ionicons"
              color="white"
              size={25}
            />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={rest => <RenderTabBar {...rest} />}
      screenOptions={{headerShown: false}}>
      <CurvedBottomBar.Screen name="Home" position="LEFT" component={Home} />
      <CurvedBottomBar.Screen name="Leave" position="LEFT" component={Leaves} />
      <CurvedBottomBar.Screen
        name="Holiday"
        position="RIGHT"
        component={Holiday}
      />
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
