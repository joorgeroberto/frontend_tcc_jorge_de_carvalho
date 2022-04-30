import React, { useCallback, useMemo, useState } from 'react';
import { Container, Header, ProgressBar } from '../styles/CreatePlanning.styles';
import { useNavigation } from '@react-navigation/native';

import { RegisterPlanningNameWeekAndDate } from './RegisterPlanningNameWeekAndDate';

import { useDispatch } from 'react-redux';
import { SignUpActions } from '@storeData/actions/SignUp';

const quantity = 6;

interface Props {
  route?: {
    params?: {
      athlete: AthleteData;
    };
  };
}

export function CreatePlanning({ route }: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const athlete = (route?.params?.athlete as AthleteData) || {};

  const [step, setStep] = useState(0);
  const [planningData, setPlanningData] = useState<SignUpData>({
    name: '',
    user_type: 'athlete',
    password: '',
    athlete_image: '',
    email: '',
    phone: '',
    birthdate: '',
    gender: 'male',
    group_name: '',
    athletes_quantity: 0,
    group_image: '',
  });

  const isFourthStep = useMemo(() => step >= 4, [step]);

  const title = useMemo(() => {
    // const user_type = signUpData?.user_type;

    // const isAdvisorRegisterGroupStep = isFourthStep && user_type === 'advisor';
    // if (isAdvisorRegisterGroupStep) {
    //   return 'Cadastre o seu grupo';
    // }

    // const isAthleteRegisterGroupStep = isFourthStep && user_type !== 'advisor';
    // if (isAthleteRegisterGroupStep) {
    //   return 'Qual o seu grupo de corrida?';
    // }

    return 'Cadastrar planejamento';
  }, []);

  const toPreviousStep = () => {
    if (step > 0) {
      return setStep(step - 1);
    }
    return navigation.goBack();
  };

  const toNextStep = useCallback(() => {
    if (isFourthStep) {
      return;
    }
    return setStep(step + 1);
  }, [isFourthStep, step]);

  const dispatchData = useCallback(
    (data: SignUpData) => {
      if (!isFourthStep) {
        return;
      }

      return dispatch(SignUpActions.SignUp(data));
    },
    [isFourthStep, dispatch],
  );

  const handleOnPressNext = (data: SignUpData) => {
    let planningDataTemp = { ...planningData };
    Object.keys(data).forEach(key => {
      planningDataTemp[key as keyof SignUpData] = data[key as keyof SignUpData] as never;
    });

    setPlanningData(planningDataTemp);
    toNextStep();
    dispatchData(planningDataTemp);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <RegisterPlanningNameWeekAndDate athlete={athlete} />;
      default:
        return <></>;
    }
  };

  return (
    <Container>
      <Header title={title} onPressBackButton={toPreviousStep} />
      <ProgressBar quantity={quantity} activeBar={step} />

      {renderStep()}
    </Container>
  );
}
