import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { colors } from '../../theme/colors';

interface UserStatsProps {
  followers?: number;
  following?: number;
  publicRepos?: number;
}

export const UserStats: React.FC<UserStatsProps> = ({
  followers = 0,
  following = 0,
  publicRepos = 0,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.stats} accessibilityRole="summary" accessibilityLabel={t('common.userStats')}>
      <View style={styles.statItem} accessibilityRole="text">
        <Text variant="titleLarge" accessibilityLabel={t('common.followersCount', { count: followers })}>{followers}</Text>
        <Text variant="bodyMedium">{t('common.followers')}</Text>
      </View>
      <View style={styles.statItem} accessibilityRole="text">
        <Text variant="titleLarge" accessibilityLabel={t('common.followingCount', { count: following })}>{following}</Text>
        <Text variant="bodyMedium">{t('common.following')}</Text>
      </View>
      <View style={styles.statItem} accessibilityRole="text">
        <Text variant="titleLarge" accessibilityLabel={t('common.repositoriesCount', { count: publicRepos })}>{publicRepos}</Text>
        <Text variant="bodyMedium">{t('common.repositories')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  statItem: {
    alignItems: 'center',
  },
});
