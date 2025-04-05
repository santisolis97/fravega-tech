import axios from 'axios';
import type { AxiosError } from 'axios';
import type { GithubUser } from '../types/github';
import type { GithubSearchResponse, ApiError } from '../types/api';

const GITHUB_API_URL = 'https://api.github.com';

export const api = axios.create({
  baseURL: GITHUB_API_URL,
});

const handleApiError = (error: AxiosError<{ message?: string }>): never => {
  const apiError: ApiError = {
    message: error.response?.data?.message || error.message || 'An unknown error occurred',
    status: error.response?.status || 500,
  };
  throw apiError;
};

export const getUsers = async (): Promise<GithubUser[]> => {
  try {
    const response = await api.get<GithubUser[]>('/users');
    return response.data;
  } catch (error) {
    return handleApiError(error as AxiosError<{ message?: string }>);
  }
};

export const searchUsers = async (query: string): Promise<GithubUser[]> => {
  try {
    if (!query.trim()) return [];
    
    const response = await api.get<GithubSearchResponse>(`/search/users?q=${encodeURIComponent(query)}`);
    return response.data.items;

  } catch (error) {
    return handleApiError(error as AxiosError<{ message?: string }>);
  }
};

export const getUser = async (username: string): Promise<GithubUser> => {
  try {
    if (!username) throw new Error('Username is required');
    
    const response = await api.get<GithubUser>(`/users/${encodeURIComponent(username)}`);
    return response.data;
  } catch (error) {
    return handleApiError(error as AxiosError<{ message?: string }>);
  }
};

export default api;
