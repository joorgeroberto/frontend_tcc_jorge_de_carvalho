import React, { useCallback, useEffect } from 'react';
import { Header } from '@components/Header';
import { Container } from '../styles/SelectAthlete.styles';
import useToken from '../../../hooks/useToken';

export function SelectAthlete() {
  const { token, getToken } = useToken();

  const dispatchGetToken = useCallback(async () => await getToken(), [getToken]);

  useEffect(() => {
    dispatchGetToken();
  }, [dispatchGetToken]);

  return (
    <Container>
      <Header title={'Selecione um Atleta'} onPressBackButton={() => console.log('voltou')} />
    </Container>
  );
}
