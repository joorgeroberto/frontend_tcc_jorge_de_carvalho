import colors from '@config/colors';
import React from 'react';
import styled from 'styled-components/native';

type Props = {
  onPress: () => void;
  isMenuVisible?: boolean;
};

export function HamburguerButton(props: Props) {
  const { onPress, isMenuVisible = false } = props;

  return (
    <Container onPress={onPress} testID="back-button">
      {isMenuVisible ? (
        <Image resizeMode="contain" source={require('@assets/icons/back_icon.png')} />
      ) : (
        <Image
          width={20}
          height={20}
          resizeMode="contain"
          source={require('@assets/icons/hamburguer_icon.png')}
        />
      )}
    </Container>
  );
}

interface ImageProps {
  width?: number;
  height?: number;
}

const Container = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-radius: 100px;
  border-color: ${colors.GRAY1};
  background-color: ${colors.WHITE};
`;

const Image = styled.Image<ImageProps>`
  width: ${({ width }) => (width ? width : 7.2)}px;
  height: ${({ height }) => (height ? height : 11.2)}px;
`;
