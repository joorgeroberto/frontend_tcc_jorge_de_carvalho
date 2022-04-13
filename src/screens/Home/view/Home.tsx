import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container } from '../styles/Home.styles';

export function Home() {
  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          console.log(value);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
  }, []);
  return <Container />;
}
