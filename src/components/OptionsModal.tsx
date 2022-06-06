import React, { useState } from 'react';
import { Dimensions, Modal as RawModal } from 'react-native';
import { Button } from './Button';
import styled from 'styled-components/native';
import colors from '@config/colors';
import { Controller } from 'react-hook-form';

const { height, width } = Dimensions.get('window');

type OptionType = 'free' | 'mandatory' | 'optional';
const options: Array<OptionType> = ['free', 'mandatory', 'optional'];

function getLabel(label: OptionType) {
  const labels = {
    free: 'Dia de Descanso',
    mandatory: 'Treino Obrigatório',
    optional: 'Treino Opcional',
  };
  return labels[label] || labels.optional;
}

interface TouchableItemProps {
  item: string;
  value: OptionType;
  onChange: (item: OptionType) => void;
}

interface Props {
  control: any;
  name: string;
  label: string;
  modalTitle: string;
}

export function OptionsModal({ control, name, label, modalTitle }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const touchableItem = ({ item, value, onChange }: TouchableItemProps) => {
    return (
      <OptionContainer
        onPress={() => onChange(item as OptionType)}
        isSelected={item === value}
        activeOpacity={0.7}>
        <TextOption isSelected={item === value}>{getLabel(item as OptionType)}</TextOption>
      </OptionContainer>
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <>
          <Label>{label}</Label>
          <ButtonContainer activeOpacity={0.7} onPress={() => setIsVisible(true)}>
            <TextButton numberOfLines={1} ellipsizeMode={'tail'}>
              {getLabel(value) || 'Type'}
            </TextButton>
            <Image source={require('../assets/icons/arrow_down_icon.png')} />
          </ButtonContainer>
          <Modal
            visible={isVisible}
            transparent={true}
            animationType={'slide'}
            onRequestClose={() => {}}>
            <ModalContainer>
              <Card>
                <TitleText>{modalTitle}</TitleText>
                <FlatList
                  data={options}
                  renderItem={({ item }) =>
                    touchableItem({ item: item as string, value, onChange })
                  }
                />
                <NavigationButtonsContainer>
                  <CloseButton label="Fechar" onPress={() => setIsVisible(false)} />
                  <ConfirmButton
                    label="Confirmar"
                    onPress={() => {
                      setIsVisible(false);
                      value ? onChange(value as OptionType) : null;
                    }}
                  />
                </NavigationButtonsContainer>
              </Card>
            </ModalContainer>
          </Modal>
        </>
      )}
    />
  );
}

const Modal = styled(RawModal)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 25px;
  color: ${colors.PRIMARY};
`;

const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 10.36px;
  height: 15px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.PRIMARY3};
`;

const TitleText = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 21.3px;
  font-weight: bold;
  color: ${colors.PRIMARY};
  margin-bottom: 29px;
`;

const Card = styled.View`
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: ${width - 40}px;
  background-color: ${colors.WHITE};
  padding: 20px;
  border-radius: 10px;
`;

const ButtonContainer = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-color: ${colors.PRIMARY};
  border-width: 1px;
  border-radius: 10px;
  padding-left: 8px;
  padding-right: 8px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const TextButton = styled.Text`
  color: ${colors.BLACK};
  font-size: 16px;
  /* max-width: 50px; */
`;

const NavigationButtonsContainer = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 40px;
`;

interface SelectedProps {
  isSelected?: boolean;
}

const OptionContainer = styled.TouchableOpacity<SelectedProps>`
  width: 100%;
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.PRIMARY3};
  background-color: ${({ isSelected }) => (isSelected ? colors.PRIMARY : colors.TRANSPARENT)};
`;

const TextOption = styled.Text<SelectedProps>`
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  color: ${({ isSelected }) => (isSelected ? colors.WHITE : colors.BLACK)};
`;

const FlatList = styled.FlatList`
  width: 100%;
  max-height: ${height * 0.3}px;
`;

const CloseButton = styled(Button).attrs({
  textColor: colors.PRIMARY,
})`
  width: ${(width - 130) / 2}px;
  border-width: 2px;
  border-color: ${colors.PRIMARY};
  background-color: ${colors.WHITE};
`;

const ConfirmButton = styled(Button)`
  width: ${(width - 130) / 2}px;
`;
