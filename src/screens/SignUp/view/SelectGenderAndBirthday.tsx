import React, { useState } from 'react';
import {
  Container,
  Input,
  ImageContainer,
  Image,
  StyledTextError,
} from '../styles/SelectGenderAndBirthday.styles';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { launchImageLibrary } from 'react-native-image-picker';
import { GenderTabs } from '@components/GenderTabs';

interface Props {
  data: SelectGenderAndBirthdayReturnData;
  onPress: (data: SelectGenderAndBirthdayReturnData) => void;
}

export function SelectGenderAndBirthday({ data, onPress }: Props) {
  const [selectedTab, setSelectedTab] = useState<Gender>({ type: 'male', name: 'Masculino' });

  return (
    <Container>
      <ImageContainer>
        <Image source={require('@assets/images/signup_running_man_image.png')} />
      </ImageContainer>

      <GenderTabs selectedTab={selectedTab} onPress={setSelectedTab} />
    </Container>
  );
}
