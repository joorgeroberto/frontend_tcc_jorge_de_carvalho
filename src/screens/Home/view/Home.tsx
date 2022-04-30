import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Container, Button } from '../styles/Home.styles';

export function Home() {
  const navigation = useNavigation();
  return (
    <Container>
      <Button
        label="Cadastrar planejamento"
        onPress={() => navigation.navigate('SelectAthlete', { calledFrom: 'Home' })}
      />
    </Container>
  );
}
