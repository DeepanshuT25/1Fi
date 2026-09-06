import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radii, spacing, typography, shadow } from '../theme';
import { formatCurrency } from '../utils/format';

export default function EMIPlanCard({ plan, isSelected, onSelect }) {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={() => onSelect(plan.id)}
      activeOpacity={0.85}
    >
      <View style={styles.radioOuter}>
        {isSelected && <View style={styles.radioInner} />}
      </View>

      <View style={styles.details}>
        <Text style={styles.tenure}>{plan.tenureMonths} months</Text>
        <Text style={styles.subtext}>
          {formatCurrency(plan.totalPayable)} total 0% interest
        </Text>
      </View>

      <View style={styles.amountBlock}>
        <Text style={styles.amount}>{formatCurrency(plan.monthlyAmount)}</Text>
        <Text style={styles.perMonth}>per month</Text>
      </View>
    </TouchableOpacity>
  );
}

export function NoCostBadge() {
  return (
    <View style={styles.badge}>
      <Feather name="check-circle" size={12} color={colors.success} />
      <Text style={styles.badgeText}>No-cost EMI Zero processing fee</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
    ...shadow.card,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  details: {
    flex: 1,
  },
  tenure: {
    ...typography.bodyBold,
  },
  subtext: {
    ...typography.caption,
    marginTop: 2,
  },
  amountBlock: {
    alignItems: 'flex-end',
  },
  amount: {
    ...typography.h3,
    color: colors.primary,
  },
  perMonth: {
    ...typography.tiny,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#ECFDF5',
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    marginBottom: spacing.lg,
  },
  badgeText: {
    ...typography.tiny,
    color: colors.success,
    fontWeight: '600',
  },
});
