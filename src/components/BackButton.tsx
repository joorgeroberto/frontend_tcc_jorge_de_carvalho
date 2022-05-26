import colors from '@config/colors';
import React from 'react';
import styled from 'styled-components/native';

type Props = {
  onPress: () => void;
  width?: number;
  height?: number;
  flipHorizontally?: Boolean;
};

export function BackButton(props: Props) {
  const { onPress, width = 40, height = 40, flipHorizontally = false } = props;

  return (
    <Container onPress={onPress} testID="back-button" width={width} height={height}>
      <Image
        width={width}
        height={height}
        resizeMode="contain"
        flipHorizontally={flipHorizontally}
        source={require('@assets/icons/back_icon.png')}
      />
    </Container>
  );
}

interface ContainerProps {
  width: number;
  height: number;
}

interface ImageProps {
  width: number;
  height: number;
  flipHorizontally: Boolean;
}

const Container = styled.TouchableOpacity<ContainerProps>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-radius: 100px;
  border-color: ${colors.GRAY1};
  background-color: ${colors.WHITE};
`;

const Image = styled.Image<ImageProps>`
  width: ${({ width }) => width * 0.18}px;
  height: ${({ height }) => height * 0.28}px;
  transform: rotate(${({ flipHorizontally }) => (flipHorizontally ? 180 : 0)}deg);
`;
