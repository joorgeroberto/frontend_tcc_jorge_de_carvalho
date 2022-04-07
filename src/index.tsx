import React from 'react';
import styled from 'styled-components/native';
import { Provider } from 'react-redux';
import { store } from './store';
import Routes from '@screens/Routes';

const App = () => (
  <Provider store={store}>
    <SafeAreaView>
      <Routes />
    </SafeAreaView>
  </Provider>
);

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export default App;
