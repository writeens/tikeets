/* eslint-disable no-undef */
import React from 'react';
import {
  fireEvent, render,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import configureStore from '../redux/configureStore';
import SignUpForm from '../components/SignUpForm';

const { store } = configureStore();

const ProviderSignUpForm = () => (
  <Provider store={store}>
    <SignUpForm />
  </Provider>
);

it('renders correctly', () => {
  const { queryByTestId, queryByPlaceholderText } = render(
    <ProviderSignUpForm />,
  );

  expect(queryByTestId('sign-up-firstname')).toBeTruthy();
  expect(queryByPlaceholderText('First Name')).toBeTruthy();

  expect(queryByTestId('sign-up-lastname')).toBeTruthy();
  expect(queryByPlaceholderText('Last Name')).toBeTruthy();

  expect(queryByTestId('sign-up-email')).toBeTruthy();
  expect(queryByPlaceholderText('Enter Email Address')).toBeTruthy();

  expect(queryByTestId('sign-up-password')).toBeTruthy();
  expect(queryByPlaceholderText('Enter Password')).toBeTruthy();
});
describe('First Name Input Value', () => {
  it('updates on change', () => {
    const { queryByPlaceholderText } = render(<ProviderSignUpForm />);
    const input = queryByPlaceholderText('First Name');
    act(() => {
      fireEvent.change(input, { target: { value: 'John' } });
    });
    expect(input.value).toBe('John');
  });
});

describe('Last Name Input Value', () => {
  it('updates on change', () => {
    const { queryByPlaceholderText } = render(<ProviderSignUpForm />);
    const input = queryByPlaceholderText('Last Name');
    act(() => {
      fireEvent.change(input, { target: { value: 'Snow' } });
    });
    expect(input.value).toBe('Snow');
  });
});
describe('Email Input Value', () => {
  it('updates on change', () => {
    const { queryByPlaceholderText } = render(<ProviderSignUpForm />);
    const input = queryByPlaceholderText('Enter Email Address');
    act(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    });
    expect(input.value).toBe('test');
  });
});

describe('Password Input Value', () => {
  it('updates on change', () => {
    const { queryByPlaceholderText } = render(<ProviderSignUpForm />);
    const input = queryByPlaceholderText('Enter Password');
    act(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    });
    expect(input.value).toBe('test');
  });
});
