import React from 'react';
import colors from '@config/colors';
import styled from 'styled-components/native';

interface InputProps {
  label: string;
}

export function InputWithLabel({ label }: InputProps) {
  return (
    <Container>
      <StyledText>{label}</StyledText>
      <StyledTextInput value="" />
    </Container>
  );
}

const Container = styled.View``;

const StyledText = styled.Text`
  font-weight: 700;
  font-size: 13px;
  line-height: 15px;
`;

const StyledTextInput = styled.TextInput`
  margin-top: 10px;
  padding-vertical: 14.71px;
  padding-horizontal: 16.5px;
  border-radius: 15px;
  border-color: ${colors.PRIMARY};
  border-width: 1px;
  background-color: ${colors.WHITE};
`;
