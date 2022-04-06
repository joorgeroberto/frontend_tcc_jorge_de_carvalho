import React from 'react';
import {
  Container,
  ImageContainer,
  ButtonsContainer,
  StyledText,
  StyledButton,
  StyledImage,
} from '../styles/SelectProfile.styles';

interface Props {
  onPress: (userType: string) => void;
}

export function SelectProfile({ onPress }: Props) {
  return (
    <Container>
      <ImageContainer>
        <StyledImage source={require('@assets/images/signup_running_man_image.png')} />
      </ImageContainer>
      <ButtonsContainer>
        <StyledText>Você é:</StyledText>
        <StyledButton
          imageSource={require('@assets/icons/advisor_button_icon.png')}
          label={'Assessor Esportivo'}
          onPress={() => onPress('advisor')}
        />
        <StyledButton
          imageSource={require('@assets/icons/monitor_button_icon.png')}
          label={'Monitor'}
          onPress={() => onPress('monitor')}
        />
        <StyledButton
          imageSource={require('@assets/icons/athlete_button_icon.png')}
          label={'Atleta'}
          onPress={() => onPress('athlete')}
        />
      </ButtonsContainer>
    </Container>
  );
}
