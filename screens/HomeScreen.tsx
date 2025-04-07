import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { useFavoritesStore } from '../store/favorites';
import { colors } from '../theme/colors';
import type { RootStackParamList } from '../navigation/types';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useUsers } from '@/hooks/useUsers';
import { useSearchUsers } from '@/hooks/useSearchUsers';
import { UserCard } from '@/components/UserCard/UserCard';

export default function HomeScreen() {
  const {t} = useTranslation();
  const [search, setSearch] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { data: users, isLoading: isLoadingUsers } = useUsers();
  const { data: searchResults, isLoading: isLoadingSearch } = useSearchUsers(activeSearch);

  const handleSearch = () => {
    setActiveSearch(search);
  };

  const handleClear = () => {
    setSearch('');
    setActiveSearch('');
  };

  const isLoading = isLoadingUsers || isLoadingSearch;
  const displayedUsers = activeSearch ? searchResults : users;

  const renderLoading = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }
    return null;
  };

  const renderEmptyState = () => {
    if (isLoading) {
      return renderLoading();
    } else {
      return (
        <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{t('common.noResults')}</Text>
      </View>
    );
  }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponentStyle={styles.searchContainer}
        ListHeaderComponent={
          <View style={styles.searchContainer}>
            <SearchBar
              value={search}
              onChangeText={setSearch}
              onSearch={handleSearch}
              onClear={handleClear}
              showClearButton={!!activeSearch}
              placeholder={t('common.searchPlaceholder')}
            />
          </View>
        }
        data={displayedUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            isFavorite={isFavorite(item)}
            onToggleFavorite={toggleFavorite}
            onPress={() => navigation.navigate('UserDetails', { username: item.login })}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    zIndex: 0,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  searchContainer: {
    padding: 8,
    paddingBottom:0,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: 16,
  },
  list: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  listContent: {
    padding: 16,
  },
  separator: {
    height: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text,
  },
});
