import { getUser } from "@/services/api";
import { GithubUser } from "@/types/github";
import { useQuery } from "@tanstack/react-query";

export const useUserDetails = (username: string) => {
    return useQuery<GithubUser, Error>({
      queryKey: ['user', username],
      queryFn: () => getUser(username),
      enabled: !!username,
    });
  };