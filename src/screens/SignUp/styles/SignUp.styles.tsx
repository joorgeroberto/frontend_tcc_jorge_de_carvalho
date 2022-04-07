import styled from 'styled-components/native';
import colors from '@config/colors';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: space-between;
  background-color: white;
`;

export const Header = styled.View`
  flex: 1;
  flex-direction: row;
  max-height: 40px;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: ${colors.BLACK};
`;

export const EmptyView = styled.View`
  width: 20px;
  height: 20px;
`;

export const StyledScroll = styled.ScrollView`
  flex: 1;
`;
