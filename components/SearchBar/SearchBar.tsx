import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '../../theme/colors';
import { Button } from '../base/Button';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  onClear: () => void;
  placeholder?: string;
  showClearButton?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSearch,
  onClear,
  showClearButton = false,
  placeholder,
}) => {
  const { t } = useTranslation();
  const handleClear = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onClear();
  };

  const handleSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onSearch();
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={styles.searchBar}
          onSubmitEditing={handleSearch}
          accessibilityLabel={t('common.searchPlaceholder')}
          testID="search-input"
        />
        <Button 
          mode='contained'
          style={styles.searchButton} 
          onPress={handleSearch}
          accessibilityLabel={t('common.search')}
          accessibilityRole="button"
          label={t('common.search')}
        />
      </View>
      <View
        style={[
          styles.clearContainer,
          { height: showClearButton ? 'auto' : 0, overflow: 'hidden' },
        ]}
      >
        <Button 
          mode='contained'
          style={styles.clearButton} 
          onPress={handleClear}
          accessibilityLabel={t('common.clearSearch')}
          accessibilityRole="button"
          label={t('common.clearSearch')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  searchBar: {
    flex: 2,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
    color: colors.text,
  },
  searchButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: colors.background,
    fontWeight: '600',
  },
  clearContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: colors.primary,
    marginVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  clearButtonText: {
    color: colors.text,
    fontWeight: '500',
  },
});
