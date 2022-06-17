import { useNavigation } from '@react-navigation/native';
import { RootState } from '@storeData/index';
import React, { useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Loader,
  Header,
  StyledFlatList,
  EmptyListContainer,
  EmptyListImage,
  EmptyListText,
} from '../styles/PlanningList.styles';

import { PlanningDetailsActions } from '@storeData/actions/PlanningDetails';
import { PlanningCell } from '@components/PlanningCell';
import { AthleteInfo } from '@components/AthleteInfo';

interface Props {
  route?: {
    params?: {
      athlete?: AthleteData;
      nextStep?: string;
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

export function PlanningList({ route }: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, plannings } = useSelector(({ planningDetails }: RootState) => planningDetails);

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

  useEffect(() => {
    const athleteIdExists = athlete.id && athlete.id.length > 0;
    if (athleteIdExists) {
      dispatch(PlanningDetailsActions.GetAllPlanningsFromAthlete({ athleteId: athlete.id }));
    }
  }, [dispatch, athlete.id]);

  const handleOnPress = (id: string) => {
    const goToTrainingList = route?.params?.nextStep === 'PerformedTrainingList';
    const selectedPlanning = plannings.find((planning: { id: string }) => planning.id === id);
    if (goToTrainingList) {
      return navigation.navigate('PerformedTrainingList', {
        planning: selectedPlanning as PlanningData,
        athlete: athlete as AthleteData,
      });
    }

    return navigation.navigate('PlanningDetails', { planning: selectedPlanning as PlanningData });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Header title={'Selecione um planejamento'} onPressBackButton={() => navigation.goBack()} />

      {plannings?.length > 0 ? (
        <>
          <AthleteInfo name={athlete?.name} image={athlete?.image} />
          <StyledFlatList
            data={plannings}
            renderItem={({ item: { id, name, startDate, endDate } }: any) => {
              const cellData: RenderItemProps = {
                id,
                name,
                startDate,
                endDate,
                onPress: () => handleOnPress(id),
              };
              return PlanningCell(cellData);
            }}
          />
        </>
      ) : (
        <EmptyListContainer>
          <EmptyListImage source={require('@assets/images/free_training_image.png')} />
          <EmptyListText>Não existem planejamentos cadastrados para este atleta.</EmptyListText>
        </EmptyListContainer>
      )}
    </Container>
  );
}
