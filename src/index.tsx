import React from 'react';
import styled from 'styled-components/native';
import { Provider } from 'react-redux';
import { store } from './store';

const App = () => (
  <Provider store={store}>
    <Container />
  </Provider>
);

export const Container = styled.View`
  flex: 1;
  background-color: red;
  align-items: center;
  justify-content: center;
`;

export default App;
