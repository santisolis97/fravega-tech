import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type TabParamList = {
  Users: undefined;
  Favorites: undefined;
};

export type RootStackParamList = {
  Home:undefined;
  UserDetails: { username: string };
};
