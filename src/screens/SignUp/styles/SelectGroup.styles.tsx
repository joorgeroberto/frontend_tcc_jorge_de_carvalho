import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Button as RawButton } from '@components/index';
import colors from '@config/colors';
const windowWidth = Dimensions.get('window').width;

export const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-between;
  background-color: white;
`;

export const GroupsList = styled.FlatList`
  flex: 1;
`;

interface GroupProps {
  isSelected: boolean;
}

export const Group = styled.TouchableOpacity<GroupProps>`
  flex-direction: row;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 0px;
  padding-right: 0px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.GRAY2};
  background-color: ${({ isSelected }) => (isSelected ? colors.GRAY2 : colors.WHITE)};
`;

export const GroupImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 20px;
`;

export const GroupTextContainer = styled.View`
  max-width: ${windowWidth - 132}px;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

const GroupText = styled.Text.attrs({ numberOfLines: 2, ellipsizeMode: 'tail' })`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: ${colors.PRIMARY};
`;

export const GroupName = styled(GroupText)`
  margin-bottom: 5px;
`;

export const GroupAdvisor = styled(GroupText)`
  font-size: 16px;
  line-height: 19px;
  color: ${colors.PRIMARY3};
`;

export const Button = styled(RawButton)`
  width: 100%;
  margin-top: 10px;
`;

export const Loader = styled.ActivityIndicator.attrs({
  size: 50,
  color: colors.PRIMARY,
})`
  flex: 1;
  align-self: center;
`;
