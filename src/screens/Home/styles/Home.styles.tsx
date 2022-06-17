import colors from '@config/colors';
import styled from 'styled-components/native';
import { Button as RawButton } from '@components/index';

export const Container = styled.ScrollView`
  flex: 1;
  /* align-items: center;
  justify-content: center; */
  background-color: ${colors.WHITE};
`;

export const OptionsContainer = styled.View`
  align-self: center;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 90%;
  border-radius: 30px;
  margin-top: 40px;
  background-color: ${colors.PRIMARY4};
`;

interface ButtonProps {
  marginBottom?: number;
}

export const Button = styled(RawButton)<ButtonProps>`
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : 10)}px;
`;

export const Title = styled.Text`
  width: 100%;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  margin-bottom: 15px;
  color: ${colors.PRIMARY};
`;
