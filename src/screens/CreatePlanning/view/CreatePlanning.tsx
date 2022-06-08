import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Container,
  Header,
  Loader,
  ProgressBar,
  AthleteCell,
  AthleteCellContainer,
} from '../styles/CreatePlanning.styles';
import { useNavigation } from '@react-navigation/native';

import { RegisterPlanningNameWeekAndDate } from './RegisterPlanningNameWeekAndDate';

import { useDispatch, useSelector } from 'react-redux';
import { SignUpActions } from '@storeData/actions/SignUp';
import { CreateReferenceTraining } from './CreateReferenceTraining';
import { RegisterPlanningWeek } from './RegisterPlanningWeek';
import { CreatePlanningActions } from '@storeData/actions/CreatePlanning';
import { RootState } from '@storeData/index';

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
  const { loading } = useSelector(({ createPlanning }: RootState) => createPlanning);
  const athlete = (route?.params?.athlete as AthleteData) || {};

  const [step, setStep] = useState(0);
  const [referenceTraining, setReferenceTraining] = useState<TrainingData>({
    date: new Date().toString(),
    type: 'mandatory',
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

  const isThirdStep = useMemo(() => step >= 2, [step]);

  const title = useMemo(() => {
    const isCreateReferenceTrainningStep = step === 1;
    if (isCreateReferenceTrainningStep) {
      return 'Crie um treino de referência';
    }

    return 'Cadastrar planejamento';
  }, [step]);

  const toPreviousStep = () => {
    if (step > 0) {
      return setStep(step - 1);
    }
    return navigation.goBack();
  };

  const toNextStep = useCallback(() => {
    if (isThirdStep) {
      return;
    }
    return setStep(step + 1);
  }, [isThirdStep, step]);

  const dispatchData = useCallback(
    (planning: PlanningData) => {
      if (!isThirdStep) {
        return;
      }
      return dispatch(CreatePlanningActions.CreatePlanning({ planning }));
    },
    [isThirdStep, dispatch],
  );

  const onSave = (data: PlanningData) => {
    let planningDataTemp = { ...planningData };
    Object.keys(data).forEach(key => {
      planningDataTemp[key as keyof PlanningData] = data[key as keyof PlanningData] as never;
    });

    return planningDataTemp;
  };

  const handleOnPressNext = (data: PlanningData) => {
    const planningDataTemp = onSave(data);

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
        return (
          <CreateReferenceTraining
            referenceTraining={referenceTraining}
            onPress={data => {
              setReferenceTraining(data as TrainingData);
              toNextStep();
            }}
          />
        );
      case 2:
        return (
          <RegisterPlanningWeek
            planning={planningData}
            referenceTraining={referenceTraining}
            onSubmit={data => handleOnPressNext(data)}
            onSave={data => onSave(data as PlanningData)}
          />
        );
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
      {loading ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </Container>
  );
}
