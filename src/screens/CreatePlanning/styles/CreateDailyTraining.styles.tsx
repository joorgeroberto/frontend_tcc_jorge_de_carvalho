import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Button as RawButton } from '@components/index';
import colors from '@config/colors';

const windowWidth = Dimensions.get('window').width;

export const Container = styled.ScrollView`
  flex: 1;
  width: ${windowWidth - 42}px;
  background-color: white;
`;

export const NextButton = styled(RawButton)`
  width: 100%;
  margin-top: 40px;
`;

export const HollowButtonContainer = styled.View`
  border-top-width: 1px;
  border-top-color: ${colors.GRAY2};
`;

export const HollowButton = styled(RawButton).attrs({
  textColor: colors.PRIMARY,
})`
  width: 100%;
  margin-top: 40px;
  border-width: 2px;
  border-color: ${colors.PRIMARY};
  background-color: ${colors.WHITE};
`;

export const GroupContainer = styled.View`
  padding-top: 21px;
  padding-bottom: 21px;
  width: 100%;
`;

export const GroupName = styled.Text`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: ${colors.PRIMARY};
`;
