import colors from '@config/colors';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import DatePicker from 'react-native-date-picker';
import { Controller } from 'react-hook-form';

import { formatDate } from '@utils/utils';

interface Props {
  control: any;
  name?: string;
  label?: string;
  placeholder?: string;
}

export function DateSelector({
  control,
  name = 'birthdate',
  label = 'Data de Nascimento:',
  placeholder = 'Selecione a sua data de nascimento.',
}: Props) {
  const [open, setOpen] = useState(false);

  const hasSavedDate = useCallback((value: string) => (value && value.length > 0) as boolean, []);

  const getInputText = useCallback(
    (value: string) => {
      if (hasSavedDate(value)) {
        return formatDate(value);
      }
      return placeholder;
    },
    [hasSavedDate, placeholder],
  );

  return (
    <Container>
      <Label>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <>
              <Input errorExists={false} onPress={() => setOpen(true)}>
                <InputText hasSavedDate={hasSavedDate(value)}>{getInputText(value)}</InputText>
              </Input>
              {error && error?.message && <StyledTextError>{error?.message}</StyledTextError>}

              <DatePicker
                modal
                mode={'date'}
                open={open}
                date={value ? new Date(value) : new Date()}
                onConfirm={selectedDate => {
                  setOpen(false);
                  onChange(selectedDate.toString());
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </>
          );
        }}
      />
    </Container>
  );
}

const Container = styled.View`
  margin-top: 15px;
  background-color: ${colors.WHITE};
`;

const Label = styled.Text`
  font-weight: 700;
  font-size: 13px;
  line-height: 15px;
  margin-bottom: 10px;
  color: ${colors.BLACK};
`;

interface InputProps {
  errorExists: boolean;
}

const Input = styled.TouchableOpacity<InputProps>`
  width: 100%;
  padding-vertical: 14.71px;
  padding-horizontal: 16.5px;
  border-radius: 15px;
  border-color: ${({ errorExists }) => (errorExists ? colors.RED : colors.PRIMARY)};
  border-width: 1px;
  background-color: ${colors.WHITE};
`;

interface InputTextProps {
  hasSavedDate: boolean;
}

const InputText = styled.Text<InputTextProps>`
  height: 18px;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: ${({ hasSavedDate }) => (hasSavedDate ? colors.BLACK : colors.GRAYPLACEHOLDER)};
`;

const StyledTextError = styled.Text`
  font-size: 13px;
  line-height: 15px;
  font-weight: 400;
  margin-top: 5px;
  color: ${colors.RED};
`;
