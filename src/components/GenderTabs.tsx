import colors from '@config/colors';
import React, { useCallback } from 'react';
import styled from 'styled-components/native';

interface Props {
  selectedTab: Gender;
  onPress: (selectedOption: Gender) => void;
}

const genderOptions: Array<Gender> = [
  { type: 'male', name: 'Masculino' },
  { type: 'female', name: 'Feminino' },
  { type: 'other', name: 'Outro' },
];

export function GenderTabs({ selectedTab, onPress }: Props) {
  const renderTab = useCallback(
    (index: number) => {
      const isSelected = genderOptions[index].type === selectedTab.type;
      return (
        <Tab
          isSelected={isSelected}
          tabsQuantity={genderOptions.length}
          onPress={() => onPress(genderOptions[index])}>
          <TabLabel isSelected={isSelected}>{genderOptions[index].name}</TabLabel>
        </Tab>
      );
    },
    [onPress, selectedTab],
  );

  return (
    <Container>
      <Label>Sexo:</Label>
      <TabsContainer>
        {Array.from(Array(genderOptions.length).keys()).map(index => {
          return renderTab(index);
        })}
      </TabsContainer>
    </Container>
  );
}

interface TabsContainerProps {
  height?: number;
}

interface TabProps {
  isSelected: boolean;
  tabsQuantity: number;
}

interface TabLabelProps {
  isSelected: boolean;
}

const Container = styled.View``;

const TabsContainer = styled.View<TabsContainerProps>`
  flex-direction: row;
  width: 100%;
  height: ${({ height }) => (height ? height : 30)}px;
  align-items: center;
  justify-content: space-between;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 3px;
  padding-right: 3px;
  background-color: ${colors.PRIMARY3};
  border-radius: 10px;
`;

const Label = styled.Text`
  font-weight: 700;
  font-size: 13px;
  line-height: 15px;
  margin-bottom: 10px;
  color: ${colors.BLACK};
`;

const Tab = styled.TouchableOpacity<TabProps>`
  width: ${({ tabsQuantity }) => 100 / tabsQuantity}%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ isSelected }) => (isSelected ? colors.WHITE : 'transparent')};
  border-radius: 8px;
`;

const TabLabel = styled.Text<TabLabelProps>`
  font-weight: 700;
  font-size: 13px;
  line-height: 15px;
  color: ${({ isSelected }) => (isSelected ? colors.PRIMARY3 : colors.WHITE)};
`;
