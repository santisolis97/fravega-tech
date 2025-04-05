import React from 'react';
import { View, StyleSheet, ScrollView, Image, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, ActivityIndicator } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserDetails } from '../hooks/useGithubUsers';
import { useFavoritesStore } from '../store/favorites';
import { Button } from '../components/base/Button';
import { UserStats } from '../components/UserStats';
import { colors } from '../theme/colors';

export default function UserDetailsScreen() {
  return <UserDetailsContent />;
}

function UserDetailsContent() {
  const route = useRoute();
  const { username } = route.params as { username: string };
  const { data: user, isLoading } = useUserDetails(username);
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  if (isLoading || !user) {
    return (
      <SafeAreaView style={styles.loadingContainer} edges={['bottom', 'top']}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'top']}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
          <Text variant="headlineMedium" style={styles.name}>{user.name || user.login}</Text>
          <Text variant="titleMedium" style={styles.login}>@{user.login}</Text>
          {user.bio && <Text variant="bodyLarge" style={styles.bio}>{user.bio}</Text>}
          {user.location && (
            <View style={styles.infoRow}>
              <Ionicons name="location" size={16} color={colors.text} />
              <Text variant="bodyMedium" style={styles.infoText}>{user.location}</Text>
            </View>
          )}
          {user.email && (
            <View style={styles.infoRow}>
              <Ionicons name="mail" size={16} color={colors.text} />
              <Text variant="bodyMedium" style={styles.infoText}>{user.email}</Text>
            </View>
          )}
          {user.blog && (
            <View style={styles.infoRow}>
              <Ionicons name="link" size={16} color={colors.text} />
              <Text
                variant="bodyMedium"
                style={[styles.infoText, styles.link]}
                onPress={() => user.blog && Linking.openURL(user.blog)}
              >
                {user.blog}
              </Text>
            </View>
          )}
          {user.company && (
            <View style={styles.infoRow}>
              <Ionicons name="business" size={16} color={colors.text} />
              <Text variant="bodyMedium" style={styles.infoText}>{user.company}</Text>
            </View>
          )}
        </View>

        <UserStats
          followers={user.followers}
          following={user.following}
          publicRepos={user.public_repos}
        />

        <Button
          testID="button"
          mode="contained"
          label={isFavorite(user) ? 'Remove from favorites' : 'Add to favorites'}
          onPress={() => toggleFavorite(user)}
          style={[styles.followButton, isFavorite(user) ? styles.removeButton : styles.addButton]}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    textAlign: 'center',
    marginBottom: 4,
  },
  login: {
    color: colors.disabled,
    marginBottom: 12,
  },
  bio: {
    textAlign: 'center',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    color: colors.text,
  },
  link: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  followButton: {
    margin: 16,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: colors.primary,
  },
  removeButton: {
    backgroundColor: colors.error,
  },
});
