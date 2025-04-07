import React from 'react';
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { GithubUser } from '@/types/github';
import { colors } from '@/theme/colors';
import { Button } from '@/components/Button/Button';

interface UserCardProps {
  user: GithubUser;
  isFavorite: boolean;
  onToggleFavorite: (user: GithubUser) => void;
  onPress: () => void;
  showStats?: boolean;
};

export function UserCard({ user, isFavorite, onToggleFavorite, onPress, showStats = true }: UserCardProps) {
  const { t } = useTranslation();
  return (
    <Pressable 
      style={styles.card} 
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={t('common.viewUserDetails', { username: user.login })}>
      <View style={styles.header}>
        <Image
          source={{ uri: user.avatar_url }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username} accessibilityLabel={t('common.username', { username: user.login })}>{user.login}</Text>
          <Text style={styles.githubText} accessibilityLabel={t('common.githubProfile', { username: user.login })}>github.com/{user.login}</Text>
        </View>
      </View>

      <Button
        mode="contained"
        testID='button'
        style={[styles.followButton, isFavorite ? styles.removeButton : styles.addButton]}
        onPress={() => onToggleFavorite(user)}
        label={isFavorite ? t('common.removeFromFavorites') : t('common.addToFavorites')}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  githubText: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.7,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: colors.surface,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: colors.disabled,
  },
  followButton: {
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
  followButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.background,
  },
});
