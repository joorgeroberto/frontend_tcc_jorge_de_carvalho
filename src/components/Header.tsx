import colors from '@config/colors';
import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { BackButton } from './BackButton';
const windowWidth = Dimensions.get('window').width;

interface Props {
  onPressBackButton: () => void;
  title: string;
}

export function Header({ title, onPressBackButton }: Props) {
  return (
    <Container>
      <BackButton onPress={onPressBackButton} />
      <Title>{title}</Title>
      <EmptyView />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  width: ${windowWidth - 42}px;
  max-height: 40px;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-left: 21px;
  margin-right: 21px;
`;

export const Title = styled.Text`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: ${colors.BLACK};
`;

export const EmptyView = styled.View`
  width: 20px;
  height: 20px;
`;
