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

interface Props {
  route?: {
    params?: {
      athleteId?: string;
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

  const athleteId = useMemo(() => {
    const athleteIdExists = route?.params?.athleteId && route?.params?.athleteId.length > 0;
    if (athleteIdExists) {
      return route?.params?.athleteId;
    }

    return Alert.alert('Atleta não encontrado', 'Por favor, tente novamente com outro atleta');
  }, [route]);

  useEffect(() => {
    const athleteIdExists = athleteId && athleteId.length > 0;
    if (athleteIdExists) {
      dispatch(PlanningDetailsActions.GetAllPlanningsFromAthlete({ athleteId }));
    }
  }, [dispatch, athleteId]);

  const handleOnPress = (id: string) => {
    console.log(id);
    const selectedPlanning = plannings.find((planning: { id: string }) => planning.id === id);
    return navigation.navigate('PlanningDetails', { planning: selectedPlanning as PlanningData });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Header title={'Selecione um planejamento'} onPressBackButton={() => navigation.goBack()} />

      {plannings?.length > 0 ? (
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
      ) : (
        <EmptyListContainer>
          <EmptyListImage source={require('@assets/images/free_training_image.png')} />
          <EmptyListText>Não existem planejamentos cadastrados para este atleta.</EmptyListText>
        </EmptyListContainer>
      )}
    </Container>
  );
}
