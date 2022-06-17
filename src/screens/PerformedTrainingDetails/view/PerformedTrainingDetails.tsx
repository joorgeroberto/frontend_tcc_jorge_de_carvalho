import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import {
  Container,
  Header,
  StyledFlatList,
  EmptyListContainer,
  EmptyListImage,
  EmptyListText,
} from '../styles/PerformedTrainingDetails.styles';
import { TrainingCell } from '@components/TrainingCell';

interface Props {
  route?: {
    params?: {
      training?: TrainingData;
    };
  };
}

interface RenderItemProps {
  id: string;
  date: string;
  onPress: () => void;
}

export function PerformedTrainingDetails({ route }: Props) {
  const navigation = useNavigation();

  return (
    <Container>
      <Header title={'Treino realizado'} onPressBackButton={() => navigation.goBack()} />
    </Container>
  );
}
