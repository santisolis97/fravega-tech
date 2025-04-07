import { getUsers } from "@/services/api";
import { GithubUser } from "@/types/github";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
    return useQuery<GithubUser[], Error>({
      queryKey: ['users'],
      queryFn: () => getUsers(),
    });
  };