import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Container,
  Header,
  ProgressBar,
  AthleteCell,
  AthleteCellContainer,
} from '../styles/CreatePlanning.styles';
import { useNavigation } from '@react-navigation/native';

import { RegisterPlanningNameWeekAndDate } from './RegisterPlanningNameWeekAndDate';

import { useDispatch } from 'react-redux';
import { SignUpActions } from '@storeData/actions/SignUp';
import { CreateReferenceTraining } from './CreateReferenceTraining';
import { RegisterPlanningWeek } from './RegisterPlanningWeek';

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
  const [referenceTraining, setReferenceTraining] = useState<TrainingData>({
    date: new Date().toString(),
    isOptional: true,
    exerciseGroups: [],
  });
  const [planningData, setPlanningData] = useState<PlanningData>({
    name: '',
    numberOfWeeks: 0,
    startDate: '',
    endDate: '',
    athleteId: athlete.id,
    trainings: [],
  });

  const isFirstStep = useMemo(() => step === 0, [step]);

  const isFourthStep = useMemo(() => step >= 4, [step]);

  // useEffect(() => {
  //   console.log('referenceTraining', referenceTraining);
  //   console.log('planningData', planningData);
  // }, [planningData, referenceTraining]);

  const title = useMemo(() => {
    // const user_type = signUpData?.user_type;

    const isCreateReferenceTrainningStep = step === 1;
    if (isCreateReferenceTrainningStep) {
      return 'Crie um treino de referência';
    }

    // const isAthleteRegisterGroupStep = isFourthStep && user_type !== 'advisor';
    // if (isAthleteRegisterGroupStep) {
    //   return 'Qual o seu grupo de corrida?';
    // }

    return 'Cadastrar planejamento';
  }, [step]);

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
    (data: PlanningData) => {
      if (!isFourthStep) {
        return;
      }
      // Add dispatch
      // return dispatch(SignUpActions.SignUp(data));
      return data;
    },
    [isFourthStep],
  );

  const handleOnPressNext = (data: PlanningData) => {
    let planningDataTemp = { ...planningData };
    Object.keys(data).forEach(key => {
      planningDataTemp[key as keyof PlanningData] = data[key as keyof PlanningData] as never;
    });

    setPlanningData(planningDataTemp);
    toNextStep();
    dispatchData(planningDataTemp);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <RegisterPlanningNameWeekAndDate
            athlete={athlete}
            planning={planningData}
            onPress={data => handleOnPressNext(data as PlanningData)}
          />
        );
      case 1:
        return <RegisterPlanningWeek planning={planningData} onSave={data => {}} />;
        return (
          <CreateReferenceTraining
            athlete={athlete}
            referenceTraining={referenceTraining}
            onPress={data => {
              setReferenceTraining(data as TrainingData);
              toNextStep();
            }}
          />
        );
      case 2:
        return <RegisterPlanningWeek planning={planningData} onSave={data => console.log(data)} />;
      default:
        return (
          <RegisterPlanningNameWeekAndDate
            athlete={athlete}
            planning={planningData}
            onPress={data => handleOnPressNext(data as PlanningData)}
          />
        );
    }
  };

  return (
    <Container>
      <Header title={title} onPressBackButton={toPreviousStep} />
      <ProgressBar quantity={quantity} activeBar={step} />
      {!isFirstStep && (
        <AthleteCellContainer>
          <AthleteCell
            name={athlete.name}
            image={athlete.image}
            description={planningData.name}
            marginTop={32}
          />
        </AthleteCellContainer>
      )}

      {renderStep()}
    </Container>
  );
}
