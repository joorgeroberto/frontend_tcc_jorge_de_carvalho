import React from 'react';
import {
  Container,
  Image,
  Button,
  TextTitle,
  TextDescription,
} from '../styles/CreatePlanningCompleted.styles';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

export function CreatePlanningCompleted() {
  const navigation = useNavigation();

  const handleOnPress = () => {
    return navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      }),
    );
  };

  return (
    <Container>
      <Image source={require('@assets/images/register_completed_screen_image.png')} />
      <TextTitle>Planejamento concluído!</TextTitle>
      <TextDescription>O planejamento já pode ser acessado no aplicativo</TextDescription>

      <Button label={'OK'} onPress={() => handleOnPress()} />
    </Container>
  );
}
