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

interface Props {
  route?: {
    params?: {
      performedTraining?: PerformedTraining;
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
