import { API_BASE_URL } from '@config/Api';
import colors from '@config/colors';
import { formatDate } from '@utils/utils';
import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
const windowWidth = Dimensions.get('window').width;

interface Props {
  name: string;
  image?: string;
  planningName?: string;
  trainingDate?: string;
}

export function AthleteInfo({ name, image = '', planningName, trainingDate }: Props) {
  return (
    <Container>
      <Image source={{ uri: `${API_BASE_URL}/files/${image}` }} />
      <TextContainer>
        <Name>{name}</Name>
        {planningName && <PlanningNameText>{planningName}</PlanningNameText>}
        {trainingDate && (
          <PlanningDateContainer>
            <CalendarIcon source={require('@assets/icons/calendar_icon.png')} />
            <PlanningDateText>{formatDate(trainingDate)}</PlanningDateText>
          </PlanningDateContainer>
        )}
      </TextContainer>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 80px;
  height: 80px;
  border-radius: 15px;
  background-color: ${colors.GRAY2};
`;

const TextContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 21px;
`;

const Name = styled.Text`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: ${colors.PRIMARY};
`;

const PlanningNameText = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin-top: 5px;
  color: ${colors.PRIMARY3};
`;

const CalendarIcon = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 20px;
  height: 23px;
  margin-right: 10.86px;
`;

const PlanningDateContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;

const PlanningDateText = styled(PlanningNameText)``;
