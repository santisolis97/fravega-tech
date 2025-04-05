import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GithubUser } from '../types/github';

interface FavoritesState {
  favorites: GithubUser[];
  toggleFavorite: (user: GithubUser) => void;
  isFavorite: (user: GithubUser) => boolean;
}

export const useFavoritesStore = create(
  persist<FavoritesState>(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (user: GithubUser) =>
        set((state) => {
          const isFavorite = state.favorites.some((f) => f.id === user.id);
          return {
            favorites: isFavorite
              ? state.favorites.filter((f) => f.id !== user.id)
              : [...state.favorites, user],
          };
        }),
      isFavorite: (user: GithubUser) => get().favorites.some((f) => f.id === user.id),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
