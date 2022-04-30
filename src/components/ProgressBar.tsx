import colors from '@config/colors';
import React, { useCallback } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
const windowWidth = Dimensions.get('window').width;

interface Props {
  quantity: number;
  activeBar: number;
  marginLeft?: number;
  marginRight?: number;
}

interface RenderBarProps {
  index: number;
}

export function ProgressBar({ quantity, activeBar, marginLeft = 0, marginRight = 0 }: Props) {
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
    <Container marginLeft={marginLeft} marginRight={marginRight}>
      {Array.from(Array(quantity).keys()).map(index => {
        return renderBar({ index });
      })}
    </Container>
  );
}

interface ContainerProps {
  marginLeft: number;
  marginRight: number;
}

const Container = styled.View<ContainerProps>`
  flex-direction: row;
  width: ${({ marginLeft, marginRight }) => windowWidth - marginLeft - marginRight}px;
  max-width: 100%;
  height: 5px;
  margin-top: 25px;
  margin-left: ${({ marginLeft }) => marginLeft}px;
  margin-right: ${({ marginRight }) => marginRight}px;
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
