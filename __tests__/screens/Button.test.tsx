import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Button } from '@components/index';

describe('Button', () => {
  test('Should render correctly', () => {
    const wrapper = render(<Button label="" onPress={jest.fn()} />);
    wrapper.getByTestId('button');
  });

  test('Should render Button with loading indicator', () => {
    const wrapper = render(<Button label="" loading onPress={jest.fn()} />);
    wrapper.getByTestId('button-loading');
  });

  test('Should render label correctly', () => {
    const wrapper = render(<Button label="mocked-label" onPress={jest.fn()} />);
    wrapper.getByText('mocked-label');
  });

  test('Should call given onPress when pressed', () => {
    const mockedOnPress = jest.fn();
    const wrapper = render(<Button label="" onPress={mockedOnPress} />);
    const button = wrapper.getByTestId('button');

    fireEvent.press(button);
    expect(mockedOnPress).toHaveBeenCalled();
  });

  test('Should accept custom view props', () => {
    const wrapper = render(<Button label="" onPress={jest.fn()} testID="custom-test-id" />);
    wrapper.getByTestId('custom-test-id');
  });
});
