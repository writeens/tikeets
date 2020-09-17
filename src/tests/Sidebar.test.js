/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '../redux/configureStore';
import Sidebar from '../components/Sidebar';

const { store } = configureStore();

const ProviderSidebar = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>
  </Provider>
);

it('renders correctly', () => {
  const { queryByTestId, queryByPlaceholderText } = render(
    <ProviderSidebar />,
  );

  expect(queryByTestId('sidebar-logo')).toBeTruthy();
});
