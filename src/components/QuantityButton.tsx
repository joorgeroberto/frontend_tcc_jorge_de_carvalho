import colors from '@config/colors';
import React from 'react';
import styled from 'styled-components/native';

type Props = {
  onPress: () => void;
  type: 'plus' | 'minus';
  width?: number;
  height?: number;
};

export function QuantityButton({ onPress, type, width = 40, height = 40 }: Props) {
  return (
    <Container onPress={onPress} testID="quantity-button" width={width} height={height}>
      <Symbol>{type === 'plus' ? '+' : '-'}</Symbol>
    </Container>
  );
}

interface ContainerProps {
  width: number;
  height: number;
}

const Container = styled.TouchableOpacity<ContainerProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  background-color: ${colors.PRIMARY3};
`;

const Symbol = styled.Text`
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
  color: ${colors.WHITE};
`;
