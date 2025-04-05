import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('renders correctly with label', () => {
    const { getByText } = render(
      <Button label="Test Button" onPress={() => {}} />
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button label="Test Button" onPress={onPress} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('has proper accessibility label', () => {
    const { getByLabelText } = render(
      <Button label="Test Button" onPress={() => {}} />
    );
    
    expect(getByLabelText('Test Button')).toBeTruthy();
  });

  it('can be disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button label="Test Button" onPress={onPress} disabled />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
