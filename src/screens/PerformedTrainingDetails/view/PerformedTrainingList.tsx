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
import { Alert } from 'react-native';
import { AthleteInfo } from '@components/AthleteInfo';

interface Props {
  route?: {
    params?: {
      planning?: PlanningData;
      athlete?: AthleteData;
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

  const planning = useMemo(() => {
    return route?.params?.planning as PlanningData;
  }, [route]);

  const performedTrainings = useMemo(() => {
    const allTrainings: Array<any> = route?.params?.planning?.trainings || [];
    return allTrainings.filter(
      training => training?.performedTraining && training?.performedTraining !== null,
    );
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

  const handleOnPress = (performedTraining: PerformedTraining, trainingDate: string) => {
    return navigation.navigate('PerformedTrainingDetails', {
      performedTraining,
      athlete,
      planning,
      trainingDate,
    });
  };

  return (
    <Container>
      <Header
        title={'Selecione um treino realizado'}
        onPressBackButton={() => navigation.goBack()}
      />

      {performedTrainings?.length > 0 ? (
        <>
          <AthleteInfo name={athlete?.name} image={athlete?.image} planningName={planning?.name} />
          <StyledFlatList
            data={performedTrainings}
            renderItem={({ item: { id, date, performedTraining } }: any) => {
              const cellData: RenderItemProps = {
                id,
                date,
                onPress: () => handleOnPress(performedTraining as PerformedTraining, date),
              };
              return TrainingCell(cellData);
            }}
          />
        </>
      ) : (
        <EmptyListContainer>
          <EmptyListImage source={require('@assets/images/free_training_image.png')} />
          <EmptyListText>Ainda não foram realizados treinos para este planejamento.</EmptyListText>
        </EmptyListContainer>
      )}
    </Container>
  );
}
