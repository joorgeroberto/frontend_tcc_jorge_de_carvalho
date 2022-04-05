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
  disabled?: boolean;
  textColor?: string;
  labelFontWeight?: string | number;
} & ViewProps;

export function Button(props: Props) {
  const {
    label,
    textColor = colors.WHITE,
    labelFontWeight = 700,
    onPress,
    loading,
    width = 254,
    height = 45,
    disabled = false,
    ...others
  } = props;

  return (
    <TouchableOpacity onPress={() => (disabled ? {} : onPress())} testID="button">
      <Container disabled={disabled} width={width} height={height} {...others}>
        {loading ? (
          <ActivityIndicator testID="button-loading" size={24} color={colors.WHITE} />
        ) : (
          <Label fontWeight={labelFontWeight} color={textColor}>
            {label}
          </Label>
        )}
      </Container>
    </TouchableOpacity>
  );
}

interface ContainerProps {
  width: number;
  height: number;
  disabled: boolean;
}

interface LabelProps {
  color: string;
  fontWeight: string | number;
}

const Container = styled.View<ContainerProps>`
  width: ${({ width }) => (width ? width : 254)}px;
  height: ${({ height }) => (height ? height : 45)}px;
  border-radius: 10px;
  background-color: ${({ disabled }) => (disabled ? colors.GRAY1 : colors.PRIMARY)};
  align-items: center;
  justify-content: center;
`;

const Label = styled.Text<LabelProps>`
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ color }) => color};
`;
