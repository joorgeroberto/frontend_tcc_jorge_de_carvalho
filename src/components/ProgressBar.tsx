import colors from '@config/colors';
import React, { useCallback } from 'react';
import styled from 'styled-components/native';

interface Props {
  quantity: number;
  activeBar: number;
}

interface RenderBarProps {
  index: number;
}

export function ProgressBar({ quantity, activeBar }: Props) {
  const renderBar = useCallback(
    ({ index }: RenderBarProps) => {
      const isActive = index <= activeBar;
      const isLastBar = index + 1 === quantity;

      return (
        <BarContainer key={index} quantity={quantity} isLastBar={isLastBar}>
          <Bar key={index} quantity={quantity} isActive={isActive} isLastBar={isLastBar} />
        </BarContainer>
      );
    },
    [activeBar, quantity],
  );

  return (
    <Container>
      {Array.from(Array(quantity).keys()).map(index => {
        return renderBar({ index });
      })}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  width: 100%;
  max-width: 100%;
  height: 5px;
  margin-top: 25px;
  background-color: ${colors.WHITE};
`;

interface BarProps {
  isActive?: boolean;
  isLastBar?: boolean;
  quantity: number;
}

const Bar = styled.View<BarProps>`
  width: 100%;
  height: 5px;
  background-color: ${({ isActive }) => (isActive ? colors.PRIMARY : colors.PRIMARY2)};
`;

const BarContainer = styled.View<BarProps>`
  width: ${({ quantity }) => 100 / quantity}%;
  height: 5px;
  padding-right: ${({ isLastBar }) => (isLastBar ? 0 : 7)}px;
`;
