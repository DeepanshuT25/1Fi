import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '../theme';

export function LoadingState({ label = 'Loading...' }) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.loadingLabel}>{label}</Text>
    </View>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <View style={styles.center}>
      <Feather name="alert-triangle" size={32} color={colors.error} />
      <Text style={styles.errorTitle}>Something went wrong</Text>
      <Text style={styles.errorMessage}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry} activeOpacity={0.85}>
          <Text style={styles.retryText}>Try again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export function EmptyState({ message = 'No results found.' }) {
  return (
    <View style={styles.center}>
      <Feather name="search" size={28} color={colors.textMuted} />
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl * 1.5,
    paddingHorizontal: spacing.xxl,
  },
  loadingLabel: {
    ...typography.caption,
    marginTop: spacing.md,
  },
  errorTitle: {
    ...typography.h3,
    marginTop: spacing.md,
  },
  errorMessage: {
    ...typography.caption,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  retryButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
  },
  retryText: {
    ...typography.bodyBold,
    color: colors.textOnPrimary,
  },
  emptyText: {
    ...typography.caption,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});
