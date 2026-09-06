import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';
import { formatCurrency } from '../utils/format';

export default function VariantSelector({ variants, selectedId, onSelect }) {
  return (
    <View style={styles.wrapper}>
      {variants.map((variant) => {
        const isSelected = variant.id === selectedId;
        return (
          <TouchableOpacity
            key={variant.id}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelect(variant.id)}
            activeOpacity={0.8}
          >
            <Text style={[styles.label, isSelected && styles.labelSelected]}>
              {variant.label}
            </Text>
            <Text style={[styles.price, isSelected && styles.priceSelected]}>
              {formatCurrency(variant.price)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    minWidth: '47%',
  },
  chipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  label: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  labelSelected: {
    color: colors.primary,
  },
  price: {
    ...typography.tiny,
    marginTop: 2,
  },
  priceSelected: {
    color: colors.primaryDark,
  },
});
