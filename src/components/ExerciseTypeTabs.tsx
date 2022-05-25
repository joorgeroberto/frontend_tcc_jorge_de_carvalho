import colors from '@config/colors';
import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { Controller } from 'react-hook-form';

interface Props {
  control: any;
  name?: string;
  label?: string;
}

interface RenderTabProps {
  index: number;
  selectedTab: string;
  onPress: (selectedTab: string) => void;
}

interface ExerciseType {
  type: 'duration' | 'distance';
  name: 'Distância' | 'Duração';
}

const options: Array<ExerciseType> = [
  { type: 'duration', name: 'Duração' },
  { type: 'distance', name: 'Distância' },
];

export function ExerciseTypeTabs({ control, name = 'type', label = 'Treinar por:' }: Props) {
  const renderTab = useCallback(({ index, selectedTab, onPress }: RenderTabProps) => {
    const isSelected = options[index].type === selectedTab;
    return (
      <Tab
        key={index}
        isSelected={isSelected}
        tabsQuantity={options.length}
        onPress={() => onPress(options[index].type)}>
        <TabLabel key={index} isSelected={isSelected}>
          {options[index].name}
        </TabLabel>
      </Tab>
    );
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value: selectedTab } }) => {
        return (
          <>
            <Container>
              <Label>{label}</Label>
              <TabsContainer>
                {Array.from(Array(options.length).keys()).map(index => {
                  return renderTab({ index: index, selectedTab, onPress: onChange });
                })}
              </TabsContainer>
            </Container>
          </>
        );
      }}
    />
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

const Container = styled.View`
  margin-top: 17px;
`;

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
