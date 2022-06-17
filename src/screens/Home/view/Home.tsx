import { API_BASE_URL } from '@config/Api';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '@storeData/index';
import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { useSelector } from 'react-redux';
import {
  Container,
  InfoContainer,
  Button,
  Title,
  OptionsContainer,
  HelloText,
  NameText,
  HeaderContainer,
  TextContainer,
  ImageAndButtonContainer,
  Image,
  HamburguerButton,
  MenuOptionsContainer,
  MenuOption,
  MenuOptionText,
  MenuOptionImage,
  Divider,
} from '../styles/Home.styles';

export function Home() {
  const navigation = useNavigation();
  const { athlete } = useSelector(({ login }: RootState) => login);
  const [isMenuVisible, setMenuVisibility] = useState(false);

  const isAdvisorUser = athlete?.user_type === 'advisor';

  const isMonitorUser = athlete?.user_type === 'monitor';

  const moveAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(moveAnim, {
      toValue: 249,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(moveAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const renderMenuOptions = () => {
    return (
      isMenuVisible && (
        <MenuOptionsContainer>
          <MenuOption
            onPress={() =>
              navigation.navigate('PlanningList', {
                athlete: (athlete as AthleteData) || ({} as AthleteData),
              })
            }>
            <MenuOptionImage source={require('@assets/icons/clock_icon_white.png')} />
            <MenuOptionText>Treinos Planejados</MenuOptionText>
          </MenuOption>
          <MenuOption
            onPress={() =>
              navigation.navigate('PlanningList', {
                athlete: (athlete as AthleteData) || ({} as AthleteData),
                nextStep: 'PerformedTrainingList',
              })
            }>
            <MenuOptionImage source={require('@assets/icons/personal_evolution_icon.png')} />
            <MenuOptionText>Treinos Realizados</MenuOptionText>
          </MenuOption>
          {(isMonitorUser || isAdvisorUser) && (
            <>
              <Divider />
              <MenuOption
                onPress={() =>
                  navigation.navigate('SelectAthlete', {
                    nextStep: 'PerformedTrainingList',
                  })
                }>
                <MenuOptionImage source={require('@assets/icons/physical_valuation.png')} />
                <MenuOptionText>Visualizar treinos realizados por um atleta</MenuOptionText>
              </MenuOption>

              <MenuOption
                onPress={() => navigation.navigate('SelectAthlete', { nextStep: 'PlanningList' })}>
                <MenuOptionImage source={require('@assets/icons/clock_icon_white.png')} />
                <MenuOptionText>Visualizar treinos de um atleta</MenuOptionText>
              </MenuOption>
            </>
          )}
          {isAdvisorUser && (
            <>
              <MenuOption
                onPress={() =>
                  navigation.navigate('SelectAthlete', { nextStep: 'CreatePlanning' })
                }>
                <MenuOptionImage
                  source={require('@assets/icons/register_physical_valuation_icon.png')}
                />
                <MenuOptionText>Cadastrar Planejamento de Treino</MenuOptionText>
              </MenuOption>
            </>
          )}
        </MenuOptionsContainer>
      )
    );
  };

  return (
    <Container>
      <InfoContainer
        isMenuVisible={isMenuVisible}
        style={{ transform: [{ translateX: moveAnim }] }}
      />
      {renderMenuOptions()}
      <HeaderContainer>
        <ImageAndButtonContainer>
          <HamburguerButton
            isMenuVisible={isMenuVisible}
            onPress={() =>
              setMenuVisibility(isOpen => {
                const newValue = !isOpen;
                newValue ? fadeIn() : fadeOut();

                return newValue;
              })
            }
          />
          <Image source={{ uri: `${API_BASE_URL}/files/${athlete?.image}` }} />
        </ImageAndButtonContainer>
        <TextContainer>
          <HelloText isMenuVisible={isMenuVisible}>Olá,</HelloText>
          <NameText isMenuVisible={isMenuVisible}>{athlete?.name}</NameText>
        </TextContainer>
      </HeaderContainer>
    </Container>
  );
}
