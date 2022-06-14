import { useNavigation } from '@react-navigation/native';
import { RootState } from '@storeData/index';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Header,
  Loader,
  SaveButtonContainer,
  SaveButton,
  StyledScrollView,
  TrainingInfoContainer,
  TrainingInfoText,
  TrainingInfoIcon,
  TrainingInfoRow,
  ArrowIcon,
  ExerciseGroupsTable,
  Divider,
} from '../styles/RegisterPerformedTraining.styles';

import { PlanningDetailsActions } from '@storeData/actions/PlanningDetails';
import { PlanningCell } from '@components/PlanningCell';
import { formatDate } from '@utils/utils';

interface Props {
  route?: {
    params?: {
      training?: TrainingData;
      planningName?: string;
    };
  };
}

interface RenderItemProps {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  onPress: () => void;
}

export function RegisterPerformedTraining({ route }: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, plannings } = useSelector(({ planningDetails }: RootState) => planningDetails);
  const [isTrainingInfoOpen, setTrainingInfoOpen] = useState(false);

  const training: TrainingData = useMemo(() => {
    return route?.params?.training as TrainingData;
  }, [route]);

  const handleOnPress = (id: string) => {
    console.log(id);
    const selectedPlanning = plannings.find((planning: { id: string }) => planning.id === id);
    return navigation.navigate('PlanningDetails', { planning: selectedPlanning as PlanningData });
  };

  const renderTrainingInfo = () => {
    return (
      <TrainingInfoContainer onPress={() => setTrainingInfoOpen(!isTrainingInfoOpen)}>
        <ArrowIcon
          resizeMode="contain"
          flipVertically={isTrainingInfoOpen}
          source={require('@assets/icons/arrow_down_icon.png')}
        />
        <TrainingInfoRow>
          <TrainingInfoIcon source={require('@assets/icons/calendar_icon.png')} />
          <TrainingInfoText>{formatDate(training?.date)}</TrainingInfoText>
        </TrainingInfoRow>
        {isTrainingInfoOpen && (
          <>
            <TrainingInfoRow marginTop={15}>
              <TrainingInfoIcon source={require('@assets/icons/athlete_button_icon_blue.png')} />
              <TrainingInfoText>{route?.params?.planningName}</TrainingInfoText>
            </TrainingInfoRow>
            <Divider />
            <ExerciseGroupsTable training={training} />
          </>
        )}
      </TrainingInfoContainer>
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Header title={'Cadastrar treino realizado'} onPressBackButton={() => navigation.goBack()} />
      {renderTrainingInfo()}

      <StyledScrollView />

      <SaveButtonContainer>
        <SaveButton label={'Salvar'} onPress={() => {}} />
      </SaveButtonContainer>
    </Container>
  );
}
