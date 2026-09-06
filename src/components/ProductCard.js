import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radii, spacing, typography, shadow } from '../theme';
import { formatCurrency } from '../utils/format';

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: product.heroImage }} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.price}>From {formatCurrency(product.startingPrice)}</Text>
        <View style={styles.emiTag}>
          <Text style={styles.emiTagText}>
            No-cost EMI upto {product.maxEmiTenureMonths} months
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.lg,
    ...shadow.card,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceAlt,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  brand: {
    ...typography.tiny,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  name: {
    ...typography.h3,
    marginTop: 2,
  },
  price: {
    ...typography.bodyBold,
    marginTop: 4,
  },
  emiTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
    marginTop: spacing.sm,
  },
  emiTagText: {
    ...typography.tiny,
    color: colors.primary,
    fontWeight: '600',
  },
});
