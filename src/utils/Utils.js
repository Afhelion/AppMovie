import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://161.35.140.236:9005';

const setCache = data => {
  AsyncStorage.setItem('firstName', data.data.user.firstName);
  AsyncStorage.setItem('lastName', data.data.user.lastName);
  AsyncStorage.setItem('email', data.data.user.email);

  AsyncStorage.setItem('token', data.data.payload.token);
  AsyncStorage.setItem('refresh', data.data.payload.refresh_token);
};

export {setCache, baseURL};
