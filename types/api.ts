import { GithubUser } from './github';

export interface GithubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[];
}

export interface ApiError {
  message: string;
  status: number;
}
