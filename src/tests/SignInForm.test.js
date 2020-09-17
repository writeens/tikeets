/* eslint-disable no-undef */
import React from 'react';
import {
  fireEvent, render,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
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

  expect(queryByTestId('sign-in-password')).toBeTruthy();
  expect(queryByPlaceholderText('Enter Password')).toBeTruthy();
});

describe('Email Input Value', () => {
  it('updates on change', () => {
    const { queryByPlaceholderText } = render(<ProviderSignInForm />);
    const input = queryByPlaceholderText('Enter Email Address');
    act(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    });
    expect(input.value).toBe('test');
  });
});

describe('Password Input Value', () => {
  it('updates on change', () => {
    const { queryByPlaceholderText } = render(<ProviderSignInForm />);
    const input = queryByPlaceholderText('Enter Password');
    act(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    });
    expect(input.value).toBe('test');
  });
});
