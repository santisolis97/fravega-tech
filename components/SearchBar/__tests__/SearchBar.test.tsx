import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchBar } from '../SearchBar';
import { LayoutAnimation, Platform, UIManager } from 'react-native';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

describe('SearchBar', () => {
  const defaultProps = {
    value: '',
    onSearch: jest.fn(),
    onChangeText: jest.fn(),
    onClear: jest.fn(),
  };

  it('renders correctly', () => {
    const { getByTestId } = render(
      <SearchBar {...defaultProps} />
    );
    
    const searchInput = getByTestId('search-input');
    expect(searchInput).toBeTruthy();
  });

  it('calls onChangeText when text is entered', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(
      <SearchBar {...defaultProps} onChangeText={onChangeText} />
    );
    
    const searchInput = getByTestId('search-input');
    fireEvent.changeText(searchInput, 'test-user');
    
    expect(onChangeText).toHaveBeenCalledWith('test-user');
  });

  it('calls onClear when clear button is pressed', () => {
    const onClear = jest.fn();
    const { getByText } = render(
      <SearchBar {...defaultProps} onClear={onClear} showClearButton={true} />
    );
    
    const clearButton = getByText('common.clearSearch');
    fireEvent.press(clearButton);
    
    expect(onClear).toHaveBeenCalled();
  });

  it('has proper accessibility labels', () => {
    const { getByTestId, getByLabelText } = render(
      <SearchBar {...defaultProps} />
    );
    
    const searchInput = getByTestId('search-input');
    expect(searchInput.props.accessibilityLabel).toBe('common.searchPlaceholder');
    expect(getByLabelText('common.search')).toBeTruthy();
    expect(getByLabelText('common.searchPlaceholder')).toBeTruthy();
  });

  it('calls onSearch when search button is pressed', () => {
    const onSearch = jest.fn();
    const { getByLabelText } = render(
      <SearchBar {...defaultProps} onSearch={onSearch} />
    );
    
    const searchButton = getByLabelText('common.search');
    fireEvent.press(searchButton);
    
    expect(onSearch).toHaveBeenCalled();
  });

  it('calls onSearch when submit editing', () => {
    const onSearch = jest.fn();
    const { getByTestId } = render(
      <SearchBar {...defaultProps} onSearch={onSearch} />
    );
    
    const searchInput = getByTestId('search-input');
    fireEvent(searchInput, 'submitEditing');
    
    expect(onSearch).toHaveBeenCalled();
  });

  it('shows clear button when showClearButton is true', () => {
    const { getByLabelText } = render(
      <SearchBar {...defaultProps} showClearButton={true} />
    );
    
    expect(getByLabelText('common.clearSearch')).toBeTruthy();
  });

  it('uses custom placeholder when provided', () => {
    const customPlaceholder = 'Custom placeholder';
    const { getByTestId } = render(
      <SearchBar {...defaultProps} placeholder={customPlaceholder} />
    );
    
    const searchInput = getByTestId('search-input');
    expect(searchInput.props.placeholder).toBe(customPlaceholder);
  });
});
