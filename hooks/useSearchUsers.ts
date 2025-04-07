import { searchUsers } from "@/services/api";
import { GithubUser } from "@/types/github";
import { useQuery } from "@tanstack/react-query";

export const useSearchUsers = (query: string) => {
    return useQuery<GithubUser[], Error>({
      queryKey: ['users', 'search', query],
      queryFn: () => searchUsers(query),
      enabled: !!query,
    });
  };