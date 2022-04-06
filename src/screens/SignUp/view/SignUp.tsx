import React, { useState } from 'react';
import { BackButton, ProgressBar } from '@components/index';
import { SelectProfile } from './SelectProfile';
import { SelectPersonalInfo } from './SelectPersonalInfo';
import { Container, Header, HeaderTitle, EmptyView, StyledScroll } from '../styles/SignUp.styles';
import { useNavigation } from '@react-navigation/native';

export function SignUp() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('Cadastre-se');
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState('');

  const toNextStep = () => {
    setStep(step + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <SelectProfile
            onPress={type => {
              setUserType(type);
              toNextStep();
            }}
          />
        );
      case 1:
        return <SelectPersonalInfo />;
      default:
        return (
          <SelectProfile
            onPress={type => {
              setUserType(type);
              toNextStep();
            }}
          />
        );
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()} />
        <HeaderTitle>{title}</HeaderTitle>
        <EmptyView />
      </Header>

      <ProgressBar quantity={5} activeBar={step} />
      <StyledScroll>{renderStep()}</StyledScroll>
    </Container>
  );
}
