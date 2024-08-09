/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import 'react-native-gesture-handler';
import prettylog from './src/utils/prettylog';

global.log = prettylog;

AppRegistry.registerComponent(appName, () => App);
