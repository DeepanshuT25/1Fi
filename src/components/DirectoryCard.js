import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, radii, spacing, typography, shadow } from '../theme';

export default function DirectoryCard({ logo, title, subtitle, trailing }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: logo }} style={styles.logo} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          {subtitle}
        </Text>
      </View>
      {trailing ? (
        <View style={styles.trailing}>
          <Text style={styles.trailingText}>{trailing}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.lg,
    ...shadow.card,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceAlt,
  },
  info: {
    flex: 1,
  },
  title: {
    ...typography.bodyBold,
  },
  subtitle: {
    ...typography.caption,
    marginTop: 2,
  },
  trailing: {
    backgroundColor: colors.chipBackground,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  trailingText: {
    ...typography.tiny,
  },
});
