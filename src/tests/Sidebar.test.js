/* eslint-disable no-undef */
import React from 'react';
import {
  fireEvent, render,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import configureStore from '../redux/configureStore';
import Sidebar from '../components/Sidebar';

const { store } = configureStore();

const ProviderSidebar = () => (
  <Provider store={store}>
    <Sidebar />
  </Provider>
);

it('renders correctly', () => {
  const { queryByTestId, queryByPlaceholderText } = render(
    <ProviderSidebar />,
  );

  expect(queryByTestId('sidebar-logo')).toBeTruthy();
});
