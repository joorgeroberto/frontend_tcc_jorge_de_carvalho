import colors from '@config/colors';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Button as RawButton, Loader as RawLoader, Header as RawHeader } from '@components/index';
const windowWidth = Dimensions.get('window').width;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${colors.WHITE};
`;

export const Loader = styled(RawLoader)``;

export const Header = styled(RawHeader)``;

export const StyledFlatList = styled.FlatList`
  flex: 1;
  width: 100%;
  padding-top: 15px;
  background-color: ${colors.WHITE};
`;

export const EmptyListContainer = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const EmptyListImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: ${windowWidth * 0.3853}px;
  height: ${windowWidth * 0.476}px;
  align-self: center;
`;

export const EmptyListText = styled.Text`
  width: 85%;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  margin-top: 40px;
  text-align: center;
  color: ${colors.PRIMARY3};
`;
