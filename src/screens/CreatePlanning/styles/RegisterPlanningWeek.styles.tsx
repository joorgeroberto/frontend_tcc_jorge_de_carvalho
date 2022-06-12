import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import {
  Button as RawButton,
  InputWithLabel,
  WeekSelector as RawWeekSelector,
} from '@components/index';
import colors from '@config/colors';

const windowWidth = Dimensions.get('window').width;

export const Container = styled.ScrollView`
  flex: 1;
  width: ${windowWidth - 42}px;
  margin-left: 21px;
  margin-right: 21px;
  background-color: white;
`;

export const WeekSelector = styled(RawWeekSelector)``;
