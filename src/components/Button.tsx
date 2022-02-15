import colors from '@config/colors';
import React from 'react';
import { ActivityIndicator, TouchableOpacity, ViewProps } from 'react-native';
import styled from 'styled-components/native';

type Props = {
  label: string;
  onPress: () => void;
  width?: number;
  height?: number;
  loading?: boolean;
} & ViewProps;

export function Button(props: Props) {
  const { label, onPress, loading, width = 254, height = 45, ...others } = props;

  return (
    <TouchableOpacity onPress={onPress} testID="button">
      <Container width={width} height={height} {...others}>
        {loading ? (
          <ActivityIndicator testID="button-loading" size={24} color={colors.WHITE} />
        ) : (
          <Label>{label}</Label>
        )}
      </Container>
    </TouchableOpacity>
  );
}

interface ContainerProps {
  width: number;
  height: number;
}

const Container = styled.View<ContainerProps>`
  width: ${({ width }) => (width ? width : 254)}px;
  height: ${({ height }) => (height ? height : 45)}px;
  background-color: ${colors.PRIMARY};
  align-items: center;
  justify-content: center;
`;

const Label = styled.Text`
  color: ${colors.WHITE};
`;
