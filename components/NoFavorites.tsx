import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { TabParamList } from '@/navigation/types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { Button } from './base/Button';

export function NoFavorites() {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList, 'Favorites'>>();
  const {t} = useTranslation();
  const handleSearchPress = () => {
    navigation.navigate('Users');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <Ionicons 
          name="star-outline" 
          size={100} 
          color={colors.background} 
          style={styles.icon} 
        />
        <Text variant="titleLarge" style={styles.title}>
          {t('common.noFavorites')}
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          {t('common.noFavoritesDescription')}
        </Text>
        <Button
          mode='contained-tonal'
          onPress={handleSearchPress}
          style={styles.button}
          label={t('common.search')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    color: colors.background,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    color: colors.background,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.background,
    color: colors.primary,
    paddingHorizontal: 16,
  },
});
