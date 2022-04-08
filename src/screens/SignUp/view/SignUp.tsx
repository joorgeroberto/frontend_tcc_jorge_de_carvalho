import React, { useMemo, useState } from 'react';
import { BackButton, ProgressBar } from '@components/index';
import { Container, Header, HeaderTitle, EmptyView } from '../styles/SignUp.styles';
import { useNavigation } from '@react-navigation/native';

import { SelectProfile } from './SelectProfile';
import { SelectPersonalInfo } from './SelectPersonalInfo';
import { SelectGenderAndBirthdate } from './SelectGenderAndBirthdate';
import { SelectPassword } from './SelectPassword';
import { RegisterGroup } from './RegisterGroup';
import { SelectGroup } from './SelectGroup';

const quantity = 5;

export function SignUp() {
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState('');
  const [personalInfoData, setPersonalInfoData] = useState<SelectPersonalInfoReturnData>({
    name: '',
    email: '',
    phone: '',
    image: '',
  });
  const [genderAndBirthdate, setGenderAndBirthdate] = useState<SelectGenderAndBirthdateReturnData>({
    gender: 'male',
    birthdate: '',
  });

  const [passwordsData, setPasswordsData] = useState<SelectPasswordReturnData>({
    password: '',
    confirmedPassword: '',
  });
  const [group, setGroup] = useState<RegisterGroupReturnData>({
    groupName: '',
    athletesQuantity: 0,
    groupImage: '',
  });
  const [selectedGroup, setSelectedGroup] = useState('');

  const title = useMemo(() => {
    const isFourthStep = step === 4;

    const isAdvisorRegisterGroupStep = isFourthStep && userType === 'advisor';
    if (isAdvisorRegisterGroupStep) {
      return 'Cadastre o seu grupo';
    }

    const isAthleteRegisterGroupStep = isFourthStep && userType !== 'advisor';
    if (isAthleteRegisterGroupStep) {
      return 'Qual o seu grupo de corrida?';
    }

    return 'Cadastre-se';
  }, [step, userType]);

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
        return (
          <SelectGenderAndBirthdate
            data={genderAndBirthdate}
            onPress={data => {
              setGenderAndBirthdate(data);
              toNextStep();
            }}
          />
        );
      case 3:
        return (
          <SelectPassword
            data={passwordsData}
            onPress={data => {
              setPasswordsData(data);
              toNextStep();
            }}
          />
        );
      case 4:
        const isAdvisor = userType === 'advisor';
        if (isAdvisor) {
          return (
            <RegisterGroup
              data={group}
              onPress={data => {
                setGroup(data);
                toNextStep();
              }}
            />
          );
        }
        return (
          <SelectGroup
            groupId={selectedGroup}
            onPress={data => {
              setSelectedGroup(data);
              // toNextStep();
            }}
          />
        );
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
      {renderStep()}
    </Container>
  );
}
