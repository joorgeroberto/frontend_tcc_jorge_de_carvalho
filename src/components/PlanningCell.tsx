import { API_BASE_URL } from '@config/Api';
import colors from '@config/colors';
import { formatDate } from '@utils/utils';
import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
const windowWidth = Dimensions.get('window').width;

interface Props {
  name: string;
  id: string;
  startDate: string;
  endDate: string;
  onPress?: () => void;
}

export function PlanningCell({ name, id, startDate, endDate, onPress }: Props) {
  return (
    <Container
      onPress={() => {
        onPress ? onPress() : {};
      }}>
      <TextContainer>
        <Name>{name}</Name>
        <DateContainer>
          <DateLabel>
            Data de início: <Date>{formatDate(startDate)}</Date>
          </DateLabel>
          <DateLabel>
            Data de finalização: <Date>{formatDate(endDate)}</Date>
          </DateLabel>
        </DateContainer>
      </TextContainer>
    </Container>
  );
}

interface ContainerProps {
  marginTop: number;
  borderColor: string;
}

const Container = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  width: ${windowWidth - 42}px;
  padding-top: 20px;
  margin-left: 21px;
  padding-bottom: 20px;
  justify-content: flex-start;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.GRAY2};
`;

const TextContainer = styled.View`
  width: ${windowWidth - 112}px;
  height: 60px;
  justify-content: center;
  margin-left: 10px;
`;

const Name = styled.Text`
  font-weight: 700;
  font-size: 20px;
  line-height: 21px;
  color: ${colors.PRIMARY};
`;

const DateContainer = styled.View`
  margin-top: 5px;
`;

const DateLabel = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  color: ${colors.PRIMARY3};
`;

const Date = styled.Text`
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  color: ${colors.BLACK};
`;

const Description = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin-top: 2px;
  color: ${colors.PRIMARY3};
`;
