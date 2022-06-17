import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import {
  Container,
  Header,
  ResultsText,
  StyledScrollView,
  ResultsRowContainer,
  TrainingDataContainer,
  TrainingData,
  TrainingDataDescription,
} from '../styles/PerformedTrainingDetails.styles';
import { TrainingCell } from '@components/TrainingCell';
import { string } from 'yup';
import { Alert } from 'react-native';
import { AthleteInfo } from '@components/AthleteInfo';

interface Props {
  route?: {
    params?: {
      performedTraining?: PerformedTraining;
      trainingDate?: any;
      athlete?: AthleteData;
      planning?: PlanningData;
    };
  };
}

interface RenderTrainingDataProps {
  description: string;
  data: string | number;
  position?: 'left' | 'right';
}

export function PerformedTrainingDetails({ route }: Props) {
  const navigation = useNavigation();

  const performedTraining = useMemo(() => {
    return route?.params?.performedTraining as PerformedTraining;
  }, [route]);

  const planning = useMemo(() => {
    return route?.params?.planning as PlanningData;
  }, [route]);

  const trainingDate = useMemo(() => {
    return route?.params?.trainingDate as string;
  }, [route]);

  const athlete: AthleteData = useMemo(() => {
    console.log(route?.params?.athlete);
    const id: string = route?.params?.athlete?.id || '';
    const athleteIdExists = id && id.length > 0;
    if (athleteIdExists) {
      return route?.params?.athlete as AthleteData;
    }

    Alert.alert('Atleta não encontrado', 'Por favor, tente novamente com outro atleta');
    return {} as AthleteData;
  }, [route]);

  const renderTrainingData = ({ description, data, position }: RenderTrainingDataProps) => {
    return (
      <TrainingDataContainer showRightBorder={position === 'left'}>
        <TrainingData>{data}</TrainingData>
        <TrainingDataDescription>{description}</TrainingDataDescription>
      </TrainingDataContainer>
    );
  };

  return (
    <Container>
      <Header title={'Treino realizado'} onPressBackButton={() => navigation.goBack()} />
      <AthleteInfo
        name={athlete?.name}
        image={athlete?.image}
        planningName={planning?.name}
        trainingDate={trainingDate}
      />

      <ResultsText>Resultados obtidos:</ResultsText>
      <StyledScrollView>
        <ResultsRowContainer>
          {renderTrainingData({
            description: 'FCmax (Bpm)',
            data: performedTraining.fcMax,
            position: 'left',
          })}
          {renderTrainingData({
            description: 'FC Repouso (Bpm)',
            data: performedTraining.fcRest,
            position: 'right',
          })}
        </ResultsRowContainer>
        <ResultsRowContainer>
          {renderTrainingData({
            description: 'FCmédia (Bpm)',
            data: performedTraining.fcMed,
            position: 'left',
          })}
          {renderTrainingData({
            description: 'Vmax (Km/h)',
            data: performedTraining.vMax,
            position: 'right',
          })}
        </ResultsRowContainer>
        <ResultsRowContainer>
          {renderTrainingData({
            description: 'Vmédia (Km/h)',
            data: performedTraining.vMed,
            position: 'left',
          })}
          {renderTrainingData({
            description: 'Tempo',
            data: performedTraining.duration,
            position: 'right',
          })}
        </ResultsRowContainer>
        <ResultsRowContainer>
          {renderTrainingData({
            description: 'Distância (Km)',
            data: performedTraining.distance,
            position: 'left',
          })}
          {renderTrainingData({
            description: 'Calorias (Kcal)',
            data: performedTraining.calories,
            position: 'right',
          })}
        </ResultsRowContainer>
      </StyledScrollView>
    </Container>
  );
}
