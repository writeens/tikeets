/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from '../redux/configureStore';
import Login from '../components/Login';

const { store } = configureStore();

const ProviderLogin = () => (
  <Provider store={store}>
    <Login />
  </Provider>
);

it('renders correctly', () => {
  const { queryByTestId, queryByPlaceholderText } = render(
    <ProviderLogin />,
  );

  expect(queryByTestId('login-sign-in')).toBeTruthy();
  expect(queryByTestId('login-sign-up')).toBeTruthy();
});
