import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radii, spacing } from '../theme';

export default function HeroBanner() {
  return (
    <View style={styles.banner}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>NO-COST EMIs</Text>
      </View>
      <Text style={styles.title}>
        Shop today,{'\n'}
        <Text style={styles.titleItalic}>Pay later using</Text>
        {'\n'}Mutual funds.
      </Text>
      <Text style={styles.subtitle}>
        No credit score required. No interest. Backed by your investments.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
    borderBottomLeftRadius: radii.xs,
    borderBottomRightRadius: radii.xs,
  },
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    marginBottom: spacing.lg,
  },
  badgeText: {
    color: colors.textOnPrimary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.textOnPrimary,
    lineHeight: 30,
  },
  titleItalic: {
    fontSize: 26,
    fontStyle: 'italic',
    fontWeight: '200',
    lineHeight:29,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 14,
  },
});