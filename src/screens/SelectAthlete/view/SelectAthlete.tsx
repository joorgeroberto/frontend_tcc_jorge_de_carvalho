import React, { useCallback, useEffect } from 'react';
import { RootState } from '@storeData/index';
import { useSelector, useDispatch } from 'react-redux';
import { SelectAthleteActions } from '@storeData/actions/SelectAthlete';

import { Header, AthleteCell, Loader } from '@components/index';
import { Container, StyledFlatList } from '../styles/SelectAthlete.styles';
import { useNavigation } from '@react-navigation/native';

interface renderItemProps {
  name: string;
  description?: string;
  image?: string;
  onPress: () => void;
}

interface handleOnPressProps {
  id: string;
  name: string;
  image?: string;
}

interface Props {
  route?: {
    params?: {
      nextStep?: string;
    };
  };
}

export function SelectAthlete({ route }: Props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { athletesFromGroup, loading } = useSelector(
    ({ selectAthlete }: RootState) => selectAthlete,
  );

  useEffect(() => {
    console.log('athletesFromGroup', athletesFromGroup);
  }, [athletesFromGroup]);

  useEffect(() => {
    dispatch(SelectAthleteActions.GetAllAthletesFromGroup());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  const handleOnPress = ({ name, image, id }: handleOnPressProps) => {
    const nextStep = route?.params?.nextStep || 'CreatePlanning';

    const goToCreatePlanning = nextStep === 'CreatePlanning';
    if (goToCreatePlanning) {
      navigation.navigate('CreatePlanning', { athlete: { name, image, id } });
    }

    const goToPlanningList = nextStep === 'PlanningList';
    if (goToPlanningList) {
      navigation.navigate('PlanningList', { athlete: { name, image, id } });
    }

    const goToPerformedTrainingList = nextStep === 'PerformedTrainingList';
    if (goToPerformedTrainingList) {
      navigation.navigate('PlanningList', {
        athlete: { name, image, id },
        nextStep: 'PerformedTrainingList',
      });
    }
  };

  return (
    <Container>
      <Header title={'Selecione um Atleta'} onPressBackButton={() => navigation.goBack()} />
      <StyledFlatList
        data={athletesFromGroup}
        renderItem={({ item: { name, image, id } }: any) => {
          const cellData: renderItemProps = {
            name,
            image,
            onPress: () => handleOnPress({ name, image, id }),
          };
          return AthleteCell(cellData);
        }}
      />
    </Container>
  );
}
