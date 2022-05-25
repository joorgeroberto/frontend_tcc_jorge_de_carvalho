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
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  secureTextEntry?: boolean;
  marginBottom?: number;
  mask?: ({ newValue, oldValue }: MaskProps) => string;
}

export function OneLineInput({
  name,
  label,
  mask,
  control,
  editable = true,
  autoCapitalize = 'none',
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
          <>
            <Container marginBottom={marginBottom}>
              <StyledText>{label}</StyledText>
              <StyledTextInput
                autoCapitalize={autoCapitalize}
                editable={editable}
                keyboardType={keyboardType}
                errorExists={!!error}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={colors.GRAYPLACEHOLDER}
                secureTextEntry={secureTextEntry}
                onChangeText={text => {
                  if (mask) {
                    const maskedValue = mask({ newValue: text, oldValue: value });
                    return onChange(maskedValue);
                  }
                  return onChange(text);
                }}
              />
            </Container>
            {error && <StyledTextError>{error?.message}</StyledTextError>}
          </>
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
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : 0)}px;
`;

const StyledText = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 16.41px;
  color: ${colors.PRIMARY3};
`;

const StyledTextInput = styled.TextInput<TextInputProps>`
  flex: 1;
  margin-top: 24px;
  margin-left: 10px;
  padding-top: 7px;
  padding-bottom: 3px;
  padding-right: 16.5px;
  border-bottom-color: ${({ errorExists }) => (errorExists ? colors.RED : colors.PRIMARY)};
  border-bottom-width: 1px;
  background-color: ${colors.WHITE};
`;

const StyledTextError = styled(StyledText)`
  font-weight: 400;
  margin-top: 5px;
  color: ${colors.RED};
`;
