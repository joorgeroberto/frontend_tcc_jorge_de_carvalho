import colors from '@config/colors';
import styled from 'styled-components/native';
import { Button as RawButton, HamburguerButton as RawHamburguerButton } from '@components/index';
import { Dimensions, Animated } from 'react-native';
const windowWidth = Dimensions.get('window').width;

const menuWidth = 249;

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${colors.PRIMARY3};
`;

export const HeaderContainer = styled.View`
  width: ${windowWidth - 42}px;
  margin-left: 21px;
  position: absolute;
  top: 21;
  background-color: ${colors.TRANSPARENT};
`;

export const ImageAndButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
  margin-bottom: 15px;
  justify-content: space-between;
`;

export const Image = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 50px;
  height: 50px;
  border-radius: 20px;
  background-color: ${colors.GRAY2};
`;

export const TextContainer = styled.View`
  width: 100%;
  background-color: ${colors.TRANSPARENT};
`;

interface InfoContainerProps {
  isMenuVisible?: boolean;
}

export const InfoContainer = styled(Animated.ScrollView)<InfoContainerProps>`
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 180px;
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

interface TextProps {
  isMenuVisible?: boolean;
}

const HomeText = styled.Text<TextProps>`
  font-weight: 700;
  font-size: 30px;
  line-height: 35px;
  margin-bottom: 8px;
  color: ${colors.PRIMARY};
`;

export const HelloText = styled(HomeText)`
  color: ${({ isMenuVisible }) => (isMenuVisible ? colors.BLACK : colors.PRIMARY)};
`;

export const NameText = styled(HomeText)`
  color: ${({ isMenuVisible }) => (isMenuVisible ? colors.WHITE : colors.PRIMARY3)};
`;

export const HamburguerButton = styled(RawHamburguerButton)``;

export const MenuOptionsContainer = styled.ScrollView`
  margin-top: 200px;
  margin-left: 21px;
  max-width: ${menuWidth - 21}px;
`;

export const MenuOption = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const MenuOptionText = styled.Text`
  max-width: ${menuWidth - 21 - 35}px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.WHITE};
`;

export const MenuOptionImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

export const Divider = styled.View`
  height: 1px;
  width: ${menuWidth - 21}px;
  margin-bottom: 15px;
  background-color: ${colors.WHITE};
`;
