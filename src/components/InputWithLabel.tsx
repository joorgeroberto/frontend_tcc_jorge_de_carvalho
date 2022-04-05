import React from 'react';
import colors from '@config/colors';
import styled from 'styled-components/native';

interface InputProps {
  label: string;
  value?: string;
  placeholder?: string;
  error?: string | undefined;
  secureTextEntry?: boolean;
  marginBottom?: number;
  onChangeText: (text: string) => void;
}

export function InputWithLabel({
  label,
  value,
  onChangeText,
  placeholder = 'Digite o seu texto!',
  secureTextEntry = false,
  marginBottom,
  error,
}: InputProps) {
  return (
    <Container marginBottom={marginBottom}>
      <StyledText>{label}</StyledText>
      <StyledTextInput
        errorExists={!!error}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
      />
      {error && <StyledTextError>{error}</StyledTextError>}
    </Container>
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
