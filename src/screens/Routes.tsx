import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';

import { Home, Initial, Login, SignUp, SignUpCompleted } from '@screens/index';

const Stack = createStackNavigator();

type AppRootParamList = {
  Home: undefined;
  Initial: undefined;
  Login: undefined;
  SignUp: undefined;
  SignUpCompleted: { isAdvisor: boolean };
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
        <Stack.Screen name="Initial" component={Initial} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignUpCompleted" component={SignUpCompleted} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
