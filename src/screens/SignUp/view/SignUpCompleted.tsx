import React from 'react';
import {
  Container,
  Image,
  Button,
  TextTitle,
  TextDescription,
} from '../styles/SignUpCompleted.styles';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

interface SignUpCompletedProps {
  route?: {
    params?: {
      isAdvisor?: boolean;
    };
  };
}

export function SignUpCompleted({ route }: SignUpCompletedProps) {
  const navigation = useNavigation();

  const isAdvisor = route?.params?.isAdvisor;

  const handleOnPress = () => {
    return navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      }),
    );
  };

  return (
    <Container>
      <Image source={require('@assets/images/register_completed_screen_image.png')} />
      <TextTitle>Cadastro concluído!</TextTitle>
      <TextDescription>
        {isAdvisor
          ? 'O seu grupo já pode ser assessorado'
          : 'O Assessor do grupo precisa aprovar o seu cadastro'}
      </TextDescription>

      <Button label={'OK'} onPress={() => handleOnPress()} />
    </Container>
  );
}
