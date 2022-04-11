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

  const [signUpData, setSignUpData] = useState<SignUpData>({
    name: '',
    user_type: 'athlete',
    password: '',
    athlete_image: '',
    email: '',
    phone: '',
    birthdate: '',
    gender: 'male',
    group_id: '',
    group_name: '',
    athletes_quantity: 0,
    group_image: '',
  });

  const title = useMemo(() => {
    const isFourthStep = step === 4;
    const user_type = signUpData?.user_type;

    const isAdvisorRegisterGroupStep = isFourthStep && user_type === 'advisor';
    if (isAdvisorRegisterGroupStep) {
      return 'Cadastre o seu grupo';
    }

    const isAthleteRegisterGroupStep = isFourthStep && user_type !== 'advisor';
    if (isAthleteRegisterGroupStep) {
      return 'Qual o seu grupo de corrida?';
    }

    return 'Cadastre-se';
  }, [step, signUpData]);

  const toPreviousStep = () => {
    if (step > 0) {
      return setStep(step - 1);
    }
    return navigation.goBack();
  };

  const toNextStep = () => {
    if (step < 4) {
      return setStep(step + 1);
    }
  };

  const handleOnPressNext = (data: SignUpData) => {
    let signUpDataTemp = { ...signUpData };
    Object.keys(data).forEach(key => {
      signUpDataTemp[key as keyof SignUpData] = data[key as keyof SignUpData] as never;
    });

    setSignUpData(signUpDataTemp);
    toNextStep();
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <SelectProfile onPress={type => handleOnPressNext({ user_type: type } as SignUpData)} />
        );
      case 1:
        return (
          <SelectPersonalInfo
            data={signUpData as SelectPersonalInfoReturnData}
            onPress={data => handleOnPressNext(data as SignUpData)}
          />
        );
      case 2:
        return (
          <SelectGenderAndBirthdate
            data={signUpData as SelectGenderAndBirthdateReturnData}
            onPress={data => handleOnPressNext(data as SignUpData)}
          />
        );
      case 3:
        return (
          <SelectPassword
            data={signUpData as SelectPasswordReturnData}
            onPress={data => handleOnPressNext(data as SignUpData)}
          />
        );
      case 4:
        const isAdvisor = signUpData?.user_type === 'advisor';
        if (isAdvisor) {
          return (
            <RegisterGroup
              data={signUpData as RegisterGroupReturnData}
              onPress={data => handleOnPressNext(data as SignUpData)}
            />
          );
        }
        return (
          <SelectGroup
            group_id={signUpData.group_id}
            onPress={data => handleOnPressNext({ group_id: data } as SignUpData)}
          />
        );
      default:
        return (
          <SelectProfile onPress={type => handleOnPressNext({ user_type: type } as SignUpData)} />
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
