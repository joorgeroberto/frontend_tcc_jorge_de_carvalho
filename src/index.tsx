import React from 'react';
import styled from 'styled-components/native';
import { Provider } from 'react-redux';
import { store } from './store';
import { Platform } from 'react-native';
import Routes from '@screens/Routes';
import colors from '@config/colors';

const App = () => (
  <Provider store={store}>
    <SafeAreaView>
      <StatusBar />
      <KeyboardAvoidingView>
        <Routes />
      </KeyboardAvoidingView>
    </SafeAreaView>
  </Provider>
);

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.WHITE};
`;

export const StatusBar = styled.StatusBar.attrs({
  barStyle: 'dark-content',
})``;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
  flex: 1;
  background-color: ${colors.WHITE};
`;

export default App;
