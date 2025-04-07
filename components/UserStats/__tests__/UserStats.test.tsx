import React from 'react';
import { render } from '@testing-library/react-native';
import { UserStats } from '../UserStats';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params: any) => {
      if (params) {
        return `${key} ${Object.values(params).join(' ')}`;
      }
      return key;
    },
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

describe('UserStats', () => {
  it('renders correctly with default values', () => {
    const { getAllByText, getByText, getByLabelText } = render(<UserStats />);
    
    const zeroElements = getAllByText('0');
    expect(zeroElements.length).toBe(3);
    expect(getByText('common.followers')).toBeTruthy();
    expect(getByText('common.following')).toBeTruthy();
    expect(getByText('common.repositories')).toBeTruthy();
    expect(getByLabelText('common.userStats')).toBeTruthy();
  });

  it('renders correctly with provided values', () => {
    const stats = {
      followers: 100,
      following: 50,
      publicRepos: 20
    };

    const { getByText } = render(<UserStats {...stats} />);
    
    expect(getByText('100')).toBeTruthy();
    expect(getByText('50')).toBeTruthy();
    expect(getByText('20')).toBeTruthy();
  });

  it('renders correctly with undefined values', () => {
    const stats = {
      followers: undefined,
      following: undefined,
      publicRepos: undefined
    };

    const { getAllByText } = render(<UserStats {...stats} />);
    
    const zeroElements = getAllByText('0');
    expect(zeroElements.length).toBe(3);
  });
});
