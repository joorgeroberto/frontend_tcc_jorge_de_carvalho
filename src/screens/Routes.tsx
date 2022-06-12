import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';

import {
  Home,
  Initial,
  Login,
  SignUp,
  SignUpCompleted,
  SelectAthlete,
  CreatePlanning,
  CreatePlanningCompleted,
  PlanningList,
  PlanningDetails,
} from '@screens/index';

const Stack = createStackNavigator();

type AppRootParamList = {
  Home: undefined;
  Initial: undefined;
  Login: undefined;
  SignUp: undefined;
  SignUpCompleted: { isAdvisor: boolean };
  SelectAthlete: { nextStep?: string };
  CreatePlanning: { athlete: AthleteData };
  PlanningList: { athleteId: string };
  PlanningDetails: { planning: PlanningData };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParamList {}
  }
}

function Routes() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Initial"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SelectAthlete" component={SelectAthlete} />
        <Stack.Screen name="Initial" component={Initial} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignUpCompleted" component={SignUpCompleted} />
        <Stack.Screen name="CreatePlanningCompleted" component={CreatePlanningCompleted} />
        <Stack.Screen name="CreatePlanning" component={CreatePlanning} />
        <Stack.Screen name="PlanningList" component={PlanningList} />
        <Stack.Screen name="PlanningDetails" component={PlanningDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
