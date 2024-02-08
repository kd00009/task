import AsyncStorage from '@react-native-async-storage/async-storage';
import {SCREENS} from '../constants/screens';
import {Alert} from 'react-native';

const handleLogin = async (email, password, navigation) => {
  if (email === '' || password === '') {
    Alert.alert('Error', 'Please fill in all fields');
    return;
  }

  try {
    await AsyncStorage.setItem('userToken', 'yourAuthToken');
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('password', password);

    console.log('Login successful');
    Alert.alert('Success', 'Login successful');
    navigation.navigate(SCREENS.HOME);
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

const getLogIn = async () => {
  try {
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');
    return {email, password};
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};

export {handleLogin, getLogIn};
