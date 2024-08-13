import React, {createContext, useReducer} from 'react';
import {ToastAndroid} from 'react-native';
import {getFromStorage, removeFromStorage, setToStorage} from '../libs/storage';

const initialState = {
  users: [],
  user: null,
  me: null,
};

const AppContext = createContext({
  users: [],
  user: null,
  me: null,
  setUsers: () => {},
  setUser: () => {},
  getUsers: () => {},
  getUser: () => {},
});

function appReducer(state, action) {
  switch (action.type) {
    case 'setUsers':
      return {
        ...state,
        user: action.payload,
      };
    case 'setUser':
      return {
        ...state,
        user: action.payload,
      };
    case 'setMe':
      return {
        ...state,
        me: action.payload,
      };
    default:
      return state;
  }
}

export function AppContextProvider({children}) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function setUsers(users) {
    try {
      setToStorage('users', users);
      dispatch({type: 'setUsers', payload: users});
    } catch (error) {
      ToastAndroid.show(
        error.message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        ToastAndroid.CENTER,
      );
    }
  }

  function setUser(user) {
    setToStorage('user', user);
    dispatch({type: 'setUser', payload: user});
    try {
    } catch (error) {
      ToastAndroid.show(
        error.message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        ToastAndroid.CENTER,
      );
    }
  }

  async function getUsers() {
    try {
      const users = await getFromStorage('users');
      return users;
    } catch (error) {
      ToastAndroid.show(
        error.message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        ToastAndroid.CENTER,
      );
    }
  }

  async function getUser() {
    try {
      const user = await getFromStorage('user');
      return user;
    } catch (error) {
      ToastAndroid.show(
        error.message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        ToastAndroid.CENTER,
      );
    }
  }

  async function setMe(user) {
    try {
      setToStorage('me', user);
      dispatch({type: 'setMe', payload: user});
    } catch (error) {
      ToastAndroid.show(
        error.message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        ToastAndroid.CENTER,
      );
    }
  }

  function logOut() {
    removeFromStorage('user');
    dispatch({type: 'setUser', payload: null});
    try {
    } catch (error) {
      ToastAndroid.show(
        error.message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        ToastAndroid.CENTER,
      );
    }
  }

  console.log('APP STATE', state);

  return (
    <AppContext.Provider
      value={{...state, setUsers, setUser, getUsers, getUser, setMe, logOut}}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
