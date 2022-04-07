import React from 'react';
import colors from '@config/colors';
import styled from 'styled-components/native';
import { KeyboardTypeOptions } from 'react-native';
import { Controller } from 'react-hook-form';

interface MaskProps {
  newValue: string;
  oldValue: string;
}

interface InputProps {
  name: string;
  label: string;
  control: any;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  marginBottom?: number;
  mask?: ({ newValue, oldValue }: MaskProps) => string;
}

export function InputWithLabel({
  name,
  label,
  mask,
  control,
  keyboardType = 'default',
  placeholder = 'Digite o seu texto!',
  secureTextEntry = false,
  marginBottom,
}: InputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <Container marginBottom={marginBottom}>
            <StyledText>{label}</StyledText>
            <StyledTextInput
              keyboardType={keyboardType}
              errorExists={!!error}
              value={value}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              onChangeText={text => {
                if (mask) {
                  const maskedValue = mask({ newValue: text, oldValue: value });
                  return onChange(maskedValue);
                }
                return onChange(text);
              }}
            />
            {error && <StyledTextError>{error?.message}</StyledTextError>}
          </Container>
        );
      }}
    />
  );
}

interface ContainerProps {
  marginBottom?: number;
}

interface TextInputProps {
  errorExists?: boolean;
}

const Container = styled.View<ContainerProps>`
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : 0)}px;
`;

const StyledText = styled.Text`
  font-weight: 700;
  font-size: 13px;
  line-height: 15px;
`;

const StyledTextInput = styled.TextInput<TextInputProps>`
  margin-top: 10px;
  padding-vertical: 14.71px;
  padding-horizontal: 16.5px;
  border-radius: 15px;
  border-color: ${({ errorExists }) => (errorExists ? colors.RED : colors.PRIMARY)};
  border-width: 1px;
  background-color: ${colors.WHITE};
`;

const StyledTextError = styled(StyledText)`
  font-weight: 400;
  margin-top: 5px;
  color: ${colors.RED};
`;
