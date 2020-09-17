/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '../redux/configureStore';
import Home from '../components/Home';

const { store } = configureStore();

const ProviderHome = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </Provider>
);

it('renders correctly', () => {
  const { queryByTestId, queryByPlaceholderText } = render(
    <ProviderHome />,
  );

  expect(queryByTestId('home-title')).toBeTruthy();
});
