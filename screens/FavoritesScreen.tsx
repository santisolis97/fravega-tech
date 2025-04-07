import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useFavoritesStore } from '../store/favorites';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { NoFavorites } from '@/components/NoFavorites/NoFavorites';
import { UserCard } from '@/components/UserCard/UserCard';

export default function FavoritesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { favorites, toggleFavorite } = useFavoritesStore();

  return (
    <View style={styles.container}>
      <FlatList
        ListEmptyComponent={<NoFavorites />}
        data={favorites}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            showStats={false}
            isFavorite={true}
            onToggleFavorite={toggleFavorite}
            onPress={() => navigation.navigate('UserDetails', { 
              username: item.login,
            })}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  list: {
    padding: 16,
  },
  separator: {
    height: 16,
  },
});
