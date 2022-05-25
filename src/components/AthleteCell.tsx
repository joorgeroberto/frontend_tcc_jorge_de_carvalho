import { API_BASE_URL } from '@config/Api';
import colors from '@config/colors';
import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
const windowWidth = Dimensions.get('window').width;

interface Props {
  name: string;
  description?: string;
  image?: string;
  marginTop?: number;
  borderColor?: string;
  onPress?: () => void;
}

export function AthleteCell({
  name,
  image = '',
  description,
  marginTop = 0,
  borderColor,
  onPress,
}: Props) {
  return (
    <Container
      marginTop={marginTop}
      borderColor={borderColor}
      onPress={() => {
        onPress ? onPress() : {};
      }}>
      <Image source={{ uri: `${API_BASE_URL}/files/${image}` }} />
      <TextContainer>
        <Name>{name}</Name>
        {description && <Description>{description}</Description>}
      </TextContainer>
    </Container>
  );
}

interface ContainerProps {
  marginTop: number;
  borderColor: string;
}

const Container = styled.TouchableOpacity<ContainerProps>`
  flex: 1;
  flex-direction: row;
  width: ${windowWidth - 42}px;
  padding-top: 10px;
  margin-left: 21px;
  margin-top: ${({ marginTop }) => marginTop}px;
  padding-bottom: 10px;
  justify-content: flex-start;
  border-bottom-width: 1px;
  border-bottom-color: ${({ borderColor }) => (borderColor ? borderColor : colors.GRAY2)};
`;

const Image = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background-color: ${colors.GRAY2};
`;

const TextContainer = styled.View`
  width: ${windowWidth - 112}px;
  height: 60px;
  justify-content: center;
  margin-left: 10px;
`;

const Name = styled.Text`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: ${colors.PRIMARY};
`;

const Description = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  margin-top: 2px;
  color: ${colors.PRIMARY3};
`;
