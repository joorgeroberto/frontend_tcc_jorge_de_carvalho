import { API_BASE_URL } from '@config/Api';
import colors from '@config/colors';
import { formatDate } from '@utils/utils';
import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
const windowWidth = Dimensions.get('window').width;

interface Props {
  date: string;
  id: string;
  onPress?: () => void;
}

export function TrainingCell({ date, onPress }: Props) {
  return (
    <Container
      onPress={() => {
        onPress ? onPress() : {};
      }}>
      <StyledIcon source={require('@assets/icons/calendar_icon.png')} />
      <TrainingDate>{formatDate(date)}</TrainingDate>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  width: ${windowWidth - 42}px;
  align-items: center;
  padding-top: 21px;
  padding-bottom: 21px;
  padding-left: 10px;
  margin-left: 21px;
  justify-content: flex-start;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.GRAY2};
`;

const StyledIcon = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 22.29px;
  height: 25.71px;
  margin-right: 10.86px;
`;

const TrainingDate = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.PRIMARY3};
`;
