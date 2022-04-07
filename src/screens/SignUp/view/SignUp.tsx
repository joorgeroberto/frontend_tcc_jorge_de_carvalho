import React, { useState } from 'react';
import { BackButton, ProgressBar } from '@components/index';
import { SelectProfile } from './SelectProfile';
import { SelectPersonalInfo } from './SelectPersonalInfo';
import { SelectGenderAndBirthday } from './SelectGenderAndBirthday';
import { Container, Header, HeaderTitle, EmptyView, StyledScroll } from '../styles/SignUp.styles';
import { useNavigation } from '@react-navigation/native';

const quantity = 5;

export function SignUp() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('Cadastre-se');
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState('');
  const [personalInfoData, setPersonalInfoData] = useState<SelectPersonalInfoReturnData>({
    name: '',
    email: '',
    phone: '',
    image: '',
  });

  const toPreviousStep = () => {
    if (step > 0) {
      return setStep(step - 1);
    }
    return navigation.goBack();
  };

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
        return (
          <SelectPersonalInfo
            data={personalInfoData}
            onPress={data => {
              setPersonalInfoData(data);
              toNextStep();
            }}
          />
        );
      case 2:
        return <SelectGenderAndBirthday onPress={data => console.log(data)} />;
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
        <BackButton onPress={toPreviousStep} />
        <HeaderTitle>{title}</HeaderTitle>
        <EmptyView />
      </Header>

      <ProgressBar quantity={quantity} activeBar={step} />
      <StyledScroll>{renderStep()}</StyledScroll>
    </Container>
  );
}
