import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { UserCard } from '../UserCard';

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

describe('UserCard', () => {
  const mockUser = {
    login: 'testuser',
    id: 1,
    node_id: 'MDQ6VXNlcjE=',
    avatar_url: 'https://example.com/avatar.jpg',
    gravatar_id: '',
    url: 'https://api.github.com/users/testuser',
    html_url: 'https://github.com/testuser',
    followers_url: 'https://api.github.com/users/testuser/followers',
    following_url: 'https://api.github.com/users/testuser/following{/other_user}',
    gists_url: 'https://api.github.com/users/testuser/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/testuser/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/testuser/subscriptions',
    organizations_url: 'https://api.github.com/users/testuser/orgs',
    repos_url: 'https://api.github.com/users/testuser/repos',
    events_url: 'https://api.github.com/users/testuser/events{/privacy}',
    received_events_url: 'https://api.github.com/users/testuser/received_events',
    type: 'User',
    site_admin: false,
    name: 'Test User',
    followers: 100,
    following: 50,
    public_repos: 20,
  };

  const defaultProps = {
    user: mockUser,
    isFavorite: false,
    onToggleFavorite: jest.fn(),
    onPress: jest.fn(),
  };

  it('renders correctly', () => {
    const { getByText } = render(<UserCard {...defaultProps} />);
    
    expect(getByText('testuser')).toBeTruthy();
    expect(getByText('github.com/testuser')).toBeTruthy();
    expect(getByText('common.addToFavorites')).toBeTruthy();
  });

  it('shows remove button when user is favorite', () => {
    const { getByText } = render(
      <UserCard {...defaultProps} isFavorite={true} />
    );
    
    expect(getByText('common.removeFromFavorites')).toBeTruthy()
  });

  it('calls onToggleFavorite when favorite button is pressed', () => {
    const onToggleFavorite = jest.fn();
    const { getByTestId } = render(
      <UserCard {...defaultProps} onToggleFavorite={onToggleFavorite} />
    );
    
    fireEvent.press(getByTestId('button'));
    expect(onToggleFavorite).toHaveBeenCalledWith(mockUser);
  });

  it('calls onPress when card is pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <UserCard {...defaultProps} onPress={onPress} />
    );
    
    fireEvent.press(getByText('testuser'));
    expect(onPress).toHaveBeenCalled();
  });

  it('has proper accessibility labels', () => {
    const { getByLabelText, getByTestId } = render(<UserCard {...defaultProps} />);
    
    expect(getByLabelText('common.viewUserDetails testuser')).toBeTruthy();
    expect(getByLabelText('common.username testuser')).toBeTruthy();
    expect(getByLabelText('common.githubProfile testuser')).toBeTruthy();
    expect(getByTestId('button').props.accessibilityLabel).toBe('common.addToFavorites');
  });
});
