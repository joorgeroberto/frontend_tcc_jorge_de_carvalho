import React, { useCallback, useEffect } from 'react';
import { RootState } from '@storeData/index';
import { useSelector, useDispatch } from 'react-redux';
import { SelectAthleteActions } from '@storeData/actions/SelectAthlete';

import { Header, AthleteCell, Loader } from '@components/index';
import { Container, StyledFlatList } from '../styles/SelectAthlete.styles';

interface renderItemProps {
  name: string;
  description?: string;
  image?: string;
  onPress: () => void;
}

export function SelectAthlete() {
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

  return (
    <Container>
      <Header title={'Selecione um Atleta'} onPressBackButton={() => console.log('voltou')} />
      <StyledFlatList
        data={athletesFromGroup}
        renderItem={({ item: { name, image } }: any) => {
          const cellData: renderItemProps = {
            name,
            image,
            onPress: () => {},
          };
          return AthleteCell(cellData);
        }}
      />
    </Container>
  );
}
