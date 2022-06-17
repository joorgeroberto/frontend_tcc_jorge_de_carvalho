import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import {
  Container,
  Header,
  StyledFlatList,
  EmptyListContainer,
  EmptyListImage,
  EmptyListText,
} from '../styles/PerformedTrainingList.styles';
import { TrainingCell } from '@components/TrainingCell';

interface Props {
  route?: {
    params?: {
      planning?: PlanningData;
    };
  };
}

interface RenderItemProps {
  id: string;
  date: string;
  onPress: () => void;
}

export function PerformedTrainingList({ route }: Props) {
  const navigation = useNavigation();

  const performedTrainings = useMemo(() => {
    const allTrainings: Array<any> = route?.params?.planning?.trainings || [];
    return allTrainings.filter(
      training => training?.performedTraining && training?.performedTraining !== null,
    );
  }, [route]);

  const handleOnPress = (performedTraining: PerformedTraining) => {
    return navigation.navigate('PerformedTrainingDetails', { performedTraining });
  };

  return (
    <Container>
      <Header
        title={'Selecione um treino realizado'}
        onPressBackButton={() => navigation.goBack()}
      />

      {performedTrainings?.length > 0 ? (
        <StyledFlatList
          data={performedTrainings}
          renderItem={({ item: { id, date, performedTraining } }: any) => {
            const cellData: RenderItemProps = {
              id,
              date,
              onPress: () => handleOnPress(performedTraining as PerformedTraining),
            };
            return TrainingCell(cellData);
          }}
        />
      ) : (
        <EmptyListContainer>
          <EmptyListImage source={require('@assets/images/free_training_image.png')} />
          <EmptyListText>Ainda não foram realizados treinos para este planejamento.</EmptyListText>
        </EmptyListContainer>
      )}
    </Container>
  );
}
