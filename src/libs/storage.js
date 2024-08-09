import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getFromStorage(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.log('Storage Error', error);
  }
}

export async function setToStorage(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Storage Error', error);
  }
}

export async function removeFromStorage(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Storage Error', error);
  }
}

export async function clearStorage() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log('Storage Error', error);
  }
}
