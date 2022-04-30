import colors from '@config/colors';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { QuantityButton } from './QuantityButton';
const windowWidth = Dimensions.get('window').width;

interface Props {
  control: any;
  name?: string;
  label?: string;
  description?: string;
}

interface handleOnChangeProps {
  value: number;
  type: 'plus' | 'minus';
}

export function WeekQuantitySelector({
  control,
  name = 'numberOfWeeks',
  label = 'Quantidade de semanas:',
  description = 'semanas',
}: Props) {
  function handleOnChange({ value, type }: handleOnChangeProps) {
    const isPlus = type === 'plus';
    const isZero = value === 0;
    if (isPlus) {
      return value + 1;
    }
    if (isZero) {
      return value;
    }

    return value - 1;
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <Container>
            <LabelText>{label}</LabelText>
            <ButtonsAndInfoContainer>
              <QuantityButton
                type="minus"
                onPress={() => onChange(handleOnChange({ type: 'minus', value: value }))}
              />
              <ValueText>{value}</ValueText>
              <QuantityButton
                type="plus"
                onPress={() => onChange(handleOnChange({ type: 'plus', value: value }))}
              />
            </ButtonsAndInfoContainer>
            <DescriptionText>{description}</DescriptionText>
            {error && error.message && <StyledTextError>{error.message}</StyledTextError>}
          </Container>
        );
      }}
    />
  );
}

const Container = styled.View`
  flex: 1;
  width: ${windowWidth - 42}px;
  max-width: ${windowWidth - 42}px;
  /* justify-content: space-between; */
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ButtonsAndInfoContainer = styled.View`
  flex: 1;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const ValueText = styled.Text`
  font-weight: 700;
  font-style: normal;
  font-size: 40px;
  line-height: 47px;
  color: ${colors.PRIMARY};
`;

const LabelText = styled.Text`
  font-weight: 700;
  font-size: 13px;
  line-height: 15px;
  margin-bottom: 15px;
  color: ${colors.BLACK};
`;

const DescriptionText = styled.Text`
  width: 100%;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
  text-align: center;
  margin-top: 10px;
  color: ${colors.PRIMARY3};
`;

const StyledTextError = styled.Text`
  width: 100%;
  font-size: 13px;
  line-height: 15px;
  font-weight: 400;
  margin-top: 10px;
  text-align: center;
  color: ${colors.RED};
`;
