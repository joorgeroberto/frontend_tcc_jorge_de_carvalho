import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default function useToken() {
  const [token, setToken] = useState<string>();

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setToken(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    token,
    getToken,
  };
}
