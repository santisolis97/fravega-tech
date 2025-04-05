import { useQuery } from '@tanstack/react-query';
import type { GithubUser } from '../types/github';
import { getUsers, searchUsers, getUser } from '../services/api';

export const useUsers = () => {
  return useQuery<GithubUser[], Error>({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });
};

export const useSearchUsers = (query: string) => {
  return useQuery<GithubUser[], Error>({
    queryKey: ['users', 'search', query],
    queryFn: () => searchUsers(query),
    enabled: !!query,
  });
};

export const useUserDetails = (username: string) => {
  return useQuery<GithubUser, Error>({
    queryKey: ['user', username],
    queryFn: () => getUser(username),
    enabled: !!username,
  });
};
