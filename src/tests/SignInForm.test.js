/* eslint-disable no-undef */
import React from 'react';
import {
  fireEvent, queryAllByPlaceholderText, render, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import Home from '../components/Home';
import configureStore from '../redux/configureStore';
import SignInForm from '../components/SignInForm';

const { store } = configureStore();

const ProviderSignInForm = () => (
  <Provider store={store}>
    <SignInForm />
  </Provider>
);

it('renders correctly', () => {
  const { queryByTestId, queryByPlaceholderText } = render(
    <ProviderSignInForm />,
  );

  expect(queryByTestId('sign-in-email')).toBeTruthy();
  expect(queryByPlaceholderText('Enter Email Address')).toBeTruthy();
});

describe('Email Input Value', () => {
  it('updates on change', () => {
    const { queryByPlaceholderText } = render(<ProviderSignInForm />);

    const emailInput = queryByPlaceholderText('Enter Email Address');
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'test' } });
    });
    expect(emailInput.value).toBe('test');
  });
});
