import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './navigation';
import './i18n';
import { StatusBar } from 'react-native';
import { colors } from './theme/colors';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar backgroundColor={colors.background} />
      <Navigation />
    </QueryClientProvider>
  );
}
