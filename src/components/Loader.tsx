import colors from '@config/colors';
import React from 'react';
import styled from 'styled-components/native';

interface Props {
  loadingText?: string;
}

export function Loader({ loadingText = 'Obtendo dados...' }: Props) {
  return (
    <Container>
      <Text>{loadingText}</Text>
      <Spinner />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-between;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  margin-bottom: 5px;
  color: ${colors.PRIMARY};
`;

const Spinner = styled.ActivityIndicator.attrs({
  size: 50,
  color: colors.PRIMARY,
})`
  align-self: center;
`;
